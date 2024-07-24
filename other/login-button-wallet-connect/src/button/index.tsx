import { FC, useEffect, useState } from "react";
import { Web3ContextType } from "@web3-react/core";
import { FormattedMessage } from "react-intl";
import { v4 } from "uuid";

import { phrase } from "@gemunion/constants";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { useUser } from "@gemunion/provider-user";
import { useConnectWalletConnect, useWalletInit } from "@gemunion/provider-wallet";
import { WalletConnectIcon } from "@gemunion/mui-icons";
import { useApiCall } from "@gemunion/react-hooks";
import type { IWalletConnectDto } from "@gemunion/types-jwt";
import type { IFirebaseLoginButtonProps } from "@gemunion/firebase-login";

import { StyledButton } from "./styled";

export const WalletConnectLoginButton: FC<IFirebaseLoginButtonProps> = props => {
  const { onTokenVerified } = props;

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

  const handleLogin = useWalletInit(async (web3Context: Web3ContextType) => {
    try {
      setIsVerifying(true);

      const wallet = web3Context.account!;
      const provider = web3Context.provider!;
      const nonce = v4();
      const signature = await provider.getSigner().signMessage(`${phrase}${nonce}`);

      const token = await getVerifiedToken(void 0, { wallet, nonce, signature });
      await onTokenVerified(token?.token || "");
    } catch (e) {
      console.error(e);
      setIsVerifying(false);
      throw e;
    }
  });

  const handleClick = useConnectWalletConnect({ onClick: handleLogin });

  const userIsAuthenticated = user.isAuthenticated();

  useEffect(() => {
    if (!userIsAuthenticated) {
      setIsVerifying(false);
    }
  }, [userIsAuthenticated]);

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
