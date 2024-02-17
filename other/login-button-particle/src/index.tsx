import { FC, useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import { useWeb3React, Web3ContextType } from "@web3-react/core";
import { FormattedMessage } from "react-intl";
import { v4 } from "uuid";

import { phrase } from "@gemunion/constants";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { useUser } from "@gemunion/provider-user";
import { getParticleButtonIcon, useConnectParticle } from "@gemunion/provider-wallet";
import { useApiCall } from "@gemunion/react-hooks";
import { useMetamask } from "@gemunion/react-hooks-eth";
import type { IMetamaskDto, IWalletLoginButtonProps } from "@gemunion/types-jwt";

import { StyledButton } from "./styled";

export const ParticleLoginButton: FC<IWalletLoginButtonProps> = props => {
  const { onWalletVerified } = props;
  const [data, setData] = useState<IMetamaskDto>({ nonce: v4(), signature: "", wallet: "" });

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

        const userInfo = window.particle?.auth?.getUserInfo?.();

        const token = await getVerifiedToken(void 0, {
          displayName: userInfo?.name,
          imageUrl: userInfo?.avatar,
          email: userInfo?.google_email || userInfo?.facebook_email,
          wallet,
          nonce: data.nonce,
          signature,
        });
        await onWalletVerified(token?.token || "");
      } catch (error) {
        console.error(error);
        setIsVerifying(false);
      }
    },
    { success: false },
  );

  const handleClick = useConnectParticle({ onClick: handleLogin });

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
      <Box sx={{ display: "flex", flexDirection: "column", mx: "auto", width: "100%", maxWidth: 220, mt: 3 }}>
        <Divider sx={{ width: "100%" }} />
        <StyledButton
          onClick={() => handleClick("google")}
          startIcon={getParticleButtonIcon("google")}
          disabled={isVerifying}
          fullWidth
        >
          <FormattedMessage id="pages.guest.signInWith.google" />
        </StyledButton>
        <StyledButton
          onClick={() => handleClick("facebook")}
          startIcon={getParticleButtonIcon("facebook")}
          disabled={isVerifying}
          fullWidth
        >
          <FormattedMessage id="pages.guest.signInWith.facebook" />
        </StyledButton>
      </Box>
    </ProgressOverlay>
  );
};
