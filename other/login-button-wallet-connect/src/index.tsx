import { FC, useEffect, useState } from "react";
import { useWeb3React, Web3ContextType } from "@web3-react/core";
import { FormattedMessage } from "react-intl";
import { v4 } from "uuid";

import { phrase } from "@gemunion/constants";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { useUser } from "@gemunion/provider-user";
import { WalletConnectIcon, useConnectWalletConnect } from "@gemunion/provider-wallet";
import { useApiCall } from "@gemunion/react-hooks";
import { useMetamask } from "@gemunion/react-hooks-eth";
import type { IWalletConnectDto } from "@gemunion/types-jwt";
import type { IFirebaseLoginButtonProps } from "@gemunion/firebase-login";

import { StyledButton } from "./styled";

export const WalletConnectLoginButton: FC<IFirebaseLoginButtonProps> = props => {
  const { onWalletVerified } = props;
  const [data, setData] = useState<IWalletConnectDto>({ nonce: "", signature: "", wallet: "" });

  const { account } = useWeb3React();
  const user = useUser<any>();

  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const { fn: getVerifiedToken, isLoading } = useApiCall(
    (api, values: IWalletConnectDto) => {
      return api
        .fetchJson({
          url: "/wallet-connect/login",
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
      } catch (error) {
        console.error(error);
        setIsVerifying(false);
      }
    },
    { success: false },
  );

  const handleClick = useConnectWalletConnect({ onClick: handleLogin });

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
        startIcon={<WalletConnectIcon viewBox="0 0 60 60" />}
        disabled={isVerifying}
        fullWidth
      >
        <FormattedMessage id="pages.guest.signInWith.walletConnect" />
      </StyledButton>
    </ProgressOverlay>
  );
};
