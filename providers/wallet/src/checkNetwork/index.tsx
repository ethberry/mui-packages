import { FC, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { useWallet } from "../provider";
import { INetwork } from "../interfaces";

interface ICheckNetworkProps {
  network: INetwork;
}

export const CheckNetwork: FC<ICheckNetworkProps> = props => {
  const { network } = props;

  const { library, active, deactivate } = useWeb3React();
  const { resetActiveConnector } = useWallet();

  const checkChainId = async () => {
    try {
      await library.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: network.chainId }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await library.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [network],
          });
          await library.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: network.chainId }],
          });
        } catch (addError: any) {
          deactivate();
          resetActiveConnector();
          console.error(addError);
        }
      } else if (error.code === 4001) {
        deactivate();
        resetActiveConnector();
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (library && active) {
      void checkChainId();
    }
  }, [library, active]);

  return null;
};
