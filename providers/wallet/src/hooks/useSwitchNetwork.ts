import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { collectionActions } from "@gemunion/provider-collection";
import { useAppDispatch, useAppSelector } from "@gemunion/redux";
import { useUser } from "@gemunion/provider-user";
import { INetwork } from "@gemunion/types-blockchain";

import { walletActions, walletSelectors } from "../reducer";

export const useSwitchNetwork = (network: INetwork) => {
  const { chainId } = useWeb3React();
  const user = useUser<any>();

  const networks = useAppSelector<Record<number, INetwork>>(walletSelectors.networksSelector);
  const dispatch = useAppDispatch();
  const { setNeedRefresh } = collectionActions;

  const switchNetwork = (chainId: number) => {
    if (network?.chainId !== chainId) {
      dispatch(walletActions.setNetwork(networks[chainId]));
      void user.setProfile({ chainId }).then(() => {
        dispatch(setNeedRefresh(true));
      });
    }
  };

  useEffect(() => {
    if (chainId) {
      switchNetwork(chainId);
    }
  }, [network, chainId]);
};
