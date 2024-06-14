import { FC, useEffect, useState, useRef } from "react";
import { useWeb3React, Web3ContextType } from "@web3-react/core";
import { FormattedMessage, useIntl } from "react-intl";
import { v4 } from "uuid";
import { enqueueSnackbar } from "notistack";

import { phrase } from "@gemunion/constants";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { useUser } from "@gemunion/provider-user";
import { useConnectMetamask } from "@gemunion/provider-wallet";
import { MetaMaskIcon } from "@gemunion/mui-icons";
import { useApiCall } from "@gemunion/react-hooks";
import type { IMetamaskDto } from "@gemunion/types-jwt";
import type { IFirebaseLoginButtonProps } from "@gemunion/firebase-login";

import { StyledButton } from "./styled";
import { IHandlerOptionsParams } from "@gemunion/react-hooks-eth/dist/interfaces";

export const useMetamaskWallet = <T = any,>(
  fn: (...args: Array<any>) => Promise<T>,
  options: IHandlerOptionsParams = {},
) => {
  const web3ContextGlobal = useWeb3React();
  const { account, chainId, connector, isActive } = web3ContextGlobal;
  const web3ContextRef = useRef(web3ContextGlobal);

  const { formatMessage } = useIntl();
  const { success = true } = options;

  useEffect(() => {
    web3ContextRef.current = web3ContextGlobal;
  }, [account, chainId, connector, isActive]);

  return async (...args: Array<any>): Promise<T> => {
    if (!web3ContextRef.current.isActive) {
      return Promise.reject(new Error("isNotActive"));
    }

    return fn(...args, web3ContextRef.current).then((transaction: any) => {
      if (success && transaction !== null) {
        enqueueSnackbar(formatMessage({ id: "snackbar.transactionSent" }, { txHash: transaction.hash }), {
          variant: "info",
        });
      }
      return transaction as T;
    });
  };
};

export const useMetamask = (fn: (...args: Array<any>) => Promise<any>, options: IHandlerOptionsParams = {}) => {
  const metaFn = useMetamaskWallet(fn, options);

  return (...args: Array<any>) => {
    return metaFn(...args) as Promise<void>;
  };
};

export const MetamaskLoginButton: FC<IFirebaseLoginButtonProps> = props => {
  const { onWalletVerified } = props;
  const [data, setData] = useState<IMetamaskDto>({ nonce: "", signature: "", wallet: "" });

  const { account } = useWeb3React();
  const user = useUser<any>();

  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const { fn: getVerifiedToken, isLoading } = useApiCall(
    (api, values: IMetamaskDto) => {
      return api
        .fetchJson({
          url: "/metamask/login",
          method: "POST",
          data: values,
        })
        .catch(error => {
          setIsVerifying(false);
          throw error;
        }) as Promise<{ token: string }>;
    },
    { success: false },
  );

  const handleLogin = useMetamask(
    async (web3Context: Web3ContextType) => {
      try {
        setIsVerifying(true);

        const wallet = web3Context.account!;
        const provider = web3Context.provider!;

        const signature = await provider.getSigner().signMessage(`${phrase}${data.nonce}`);
        setData({ ...data, wallet, signature });

        const token = await getVerifiedToken(void 0, { wallet, nonce: data.nonce, signature });
        await onWalletVerified(token?.token || "");
      } catch (e) {
        console.error(e);
        setIsVerifying(false);
        throw e;
      }
    },
    { success: false, error: false },
  );

  const handleClick = useConnectMetamask({ onClick: handleLogin });

  const userIsAuthenticated = user.isAuthenticated();

  useEffect(() => {
    if (!userIsAuthenticated) {
      setIsVerifying(false);
    }
  }, [userIsAuthenticated]);

  useEffect(() => {
    setData({ nonce: v4(), signature: "", wallet: account || "" });
  }, [account]);

  return (
    <ProgressOverlay isLoading={isLoading}>
      <StyledButton
        onClick={handleClick}
        startIcon={<MetaMaskIcon viewBox="0 0 60 60" />}
        disabled={isVerifying}
        fullWidth
      >
        <FormattedMessage id="pages.guest.signInWith.metamask" />
      </StyledButton>
    </ProgressOverlay>
  );
};
