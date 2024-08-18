import { useEffect, useRef } from "react";
import { Web3ContextType, useWeb3React } from "@web3-react/core";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { v4 } from "uuid";

import { phrase } from "@gemunion/constants";
import firebase from "@gemunion/firebase";
import { useUser } from "@gemunion/provider-user";
import { useApiCall } from "@gemunion/react-hooks";
import { useAppSelector, useAppDispatch } from "@gemunion/redux";
import type { IMetamaskDto, IWalletConnectDto } from "@gemunion/types-jwt";
import { collectionActions } from "@gemunion/provider-collection";

import { TConnectors, walletSelectors } from "../reducer";
import { useWalletInit } from "./useWalletInit";
import { useConnectMetamask } from "./useConnectMetamask";
import { useWallet } from "../provider";
import { useConnectWalletConnect } from "./useConnectWalletConnect";

export const useSwitchAccount = () => {
  const authFb = getAuth(firebase);
  const user = useUser<any>();
  const { account = "", isActive, provider, connector } = useWeb3React();

  const currentWallet = useRef<string>("");
  const disconnectedAccounts = useRef<Map<string, boolean>>(new Map());
  const {
    walletConnector: [walletConnect, _, store],
  } = useWallet();

  const activeConnector = useAppSelector<TConnectors>(walletSelectors.activeConnectorSelector);
  const dispatch = useAppDispatch();

  const { setNeedRefresh } = collectionActions;
  const isUserAuthenticated = user.isAuthenticated();

  const handleDisconnect = async () => {
    await user.logOut();
  };

  const _handleDisconnect = async () => {
    await user.logOut();
    if (connector?.deactivate) {
      void connector.deactivate();
    } else {
      void connector?.resetState();
    }
  };

  const handleTokenVerified = async (token: string) => {
    if (!token) {
      return;
    }
    await signInWithCustomToken(authFb, token);
    await user.logIn(void 0, location.pathname).catch(e => {
      console.error("login error", e);
      void handleDisconnect();
    });
    dispatch(setNeedRefresh(true));
  };

  const { fn: getVerifiedToken } = useApiCall(
    (api, values: IMetamaskDto | IWalletConnectDto) => {
      return api
        .fetchJson({
          url: activeConnector === TConnectors.METAMASK ? "/metamask/login" : "/wallet-connect/login",
          method: "POST",
          data: values,
        })
        .catch(error => {
          void handleDisconnect();
          throw error;
        }) as Promise<{ token: string }>;
    },
    { success: false },
  );

  const onLoginMetamask = useWalletInit(async (web3Context: Web3ContextType) => {
    try {
      const provider = web3Context.provider!;
      const nonce = v4();
      const signature = await provider.getSigner().signMessage(`${phrase}${nonce}`);
      const token = await getVerifiedToken(void 0, { wallet: currentWallet.current || account, nonce, signature });
      await handleTokenVerified(token?.token || "");
    } catch (error) {
      console.error(error);
      await handleDisconnect();
    }
  });

  const handleLogin = useWalletInit(async (web3Context: Web3ContextType) => {
    try {
      const wallet = web3Context.account!;
      const provider = web3Context.provider!;
      const nonce = v4();
      const signature = await provider.getSigner(currentWallet.current || undefined).signMessage(`${phrase}${nonce}`);
      const token = await getVerifiedToken(void 0, { wallet: currentWallet.current || wallet, nonce, signature });
      await handleTokenVerified(token?.token || "");
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  const handleMetamaskLogin = useConnectMetamask({ onClick: onLoginMetamask });
  const handleWalletConnectLogin = useConnectWalletConnect({ onClick: handleLogin });

  useEffect(() => {
    console.log("account", disconnectedAccounts.current.size, activeConnector);
    if (!activeConnector && disconnectedAccounts.current.size > 0) {
      void handleWalletConnectLogin();
      disconnectedAccounts.current.delete(account);
      return;
    }

    const accountsChangedObserver = (accounts: Array<string>) => {
      if (accounts.length > 1) {
        currentWallet.current = accounts[0];
        void handleWalletConnectLogin();
      } else {
        console.log("account", account);
        console.log("accounts", accounts);
        if (isUserAuthenticated) {
          disconnectedAccounts.current.set(account, true);
          void _handleDisconnect();
        }
      }
    };

    walletConnect.provider?.on("accountsChanged", accountsChangedObserver);

    return () => {
      walletConnect.provider?.off("accountsChanged", accountsChangedObserver);
    };
  }, [walletConnect, account, isActive, isUserAuthenticated, activeConnector]);

  useEffect(() => {
    if (!activeConnector || currentWallet.current === account) {
      if (disconnectedAccounts.current.has(account)) {
        void handleMetamaskLogin();
        disconnectedAccounts.current.delete(account);
      }
      return;
    }

    if (activeConnector === TConnectors.METAMASK) {
      provider!
        .listAccounts()
        .then(accountList => {
          if (!isActive) {
            return;
          }

          if (currentWallet.current && !accountList.includes(currentWallet.current)) {
            if (isUserAuthenticated) {
              void user.logOut();
              disconnectedAccounts.current.set(currentWallet.current, true);
            }
            return;
          }

          if (!currentWallet.current) {
            currentWallet.current = account;
          } else if (currentWallet.current !== account) {
            if (isUserAuthenticated) {
              void user.logOut();
            } else {
              void handleMetamaskLogin();
              currentWallet.current = account;
            }
          }
        })
        .catch((e: any) => {
          console.error(e);
        });
    }
  }, [account, isActive, isUserAuthenticated, activeConnector]);
};
