import { FC, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

interface IOnWalletConnectProps {
  callback: any;
  setCallback: (fn: any) => void;
}

export const OnWalletConnect: FC<IOnWalletConnectProps> = props => {
  const { callback, setCallback } = props;

  const { isActive } = useWeb3React();

  useEffect(() => {
    if (isActive && callback) {
      // eslint-disable-next-line promise/catch-or-return
      callback().finally(() => setCallback(null));
    }
  }, [isActive, callback]);

  return null;
};
