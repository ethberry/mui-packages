import { FC, useEffect, useState } from "react";
import { Web3ContextType } from "@web3-react/core";
import { FormattedMessage } from "react-intl";
import { v4 } from "uuid";

import { phrase } from "@ethberry/constants";
import { ProgressOverlay } from "@ethberry/mui-page-layout";
import { useUser } from "@ethberry/provider-user";
import { useConnectMetamask, useWalletInit } from "@ethberry/provider-wallet";
import { MetaMaskIcon } from "@ethberry/mui-icons";
import { useApiCall } from "@ethberry/react-hooks";
import type { IMetamaskDto } from "@ethberry/types-jwt";
import type { IFirebaseLoginButtonProps } from "@ethberry/firebase-login";

import { StyledButton } from "./styled";
import { isDesktopDevice } from "./utils";

export const MetamaskLoginButton: FC<IFirebaseLoginButtonProps> = props => {
  const { onTokenVerified } = props;

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

  const handleClick = useConnectMetamask({ onClick: handleLogin });

  const userIsAuthenticated = user.isAuthenticated();

  useEffect(() => {
    if (!userIsAuthenticated) {
      setIsVerifying(false);
    }
  }, [userIsAuthenticated]);

  if (!isDesktopDevice()) {
    return null;
  }

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
