import { FC, MouseEvent, useEffect, useState } from "react";
import { Box, Divider, MenuItem } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useWeb3React, Web3ContextType } from "@web3-react/core";
import { FormattedMessage } from "react-intl";
import { v4 } from "uuid";

import { phrase } from "@gemunion/constants";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { useUser } from "@gemunion/provider-user";
import { getParticleButtonIcon, ParticleIcon, useConnectParticle } from "@gemunion/provider-wallet";
import { useApiCall } from "@gemunion/react-hooks";
import { useMetamask } from "@gemunion/react-hooks-eth";
import type { IParticleDto } from "@gemunion/types-jwt";
import type { IFirebaseLoginButtonProps } from "@gemunion/firebase-login";

import { StyledButton, StyledMenu } from "./styled";

export const ParticleLoginButton: FC<IFirebaseLoginButtonProps> = props => {
  const { onWalletVerified } = props;
  const [data, setData] = useState<IParticleDto>({ nonce: "", signature: "", wallet: "" });

  const { account } = useWeb3React();

  const user = useUser<any>();

  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { fn: getVerifiedToken, isLoading } = useApiCall(
    (api, values: IParticleDto) => {
      return api
        .fetchJson({
          url: "/particle/login",
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
      <Box sx={{ display: "flex", flexDirection: "column", mx: "auto", width: "100%", maxWidth: 220, my: 3 }}>
        <Divider sx={{ width: "100%" }} />
        <StyledButton
          id="particle-button"
          aria-controls={open ? "particle-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleOpen}
          startIcon={<ParticleIcon sx={{ width: 22, height: 22 }} />}
          endIcon={<KeyboardArrowDown />}
        >
          <FormattedMessage id="pages.guest.signInWith.particle" />
        </StyledButton>
        <StyledMenu
          id="particle-menu"
          MenuListProps={{
            "aria-labelledby": "particle-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          elevation={0}
        >
          <MenuItem onClick={() => handleClick("google")} disabled={isVerifying}>
            {getParticleButtonIcon("google")}
            <FormattedMessage id="pages.guest.signInWith.google" />
          </MenuItem>
          <MenuItem onClick={() => handleClick("facebook")} disabled={isVerifying}>
            {getParticleButtonIcon("facebook")}
            <FormattedMessage id="pages.guest.signInWith.facebook" />
          </MenuItem>
        </StyledMenu>
      </Box>
    </ProgressOverlay>
  );
};
