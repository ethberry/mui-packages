import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useWeb3React, Web3ContextType } from "@web3-react/core";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { FormattedMessage } from "react-intl";
import { v4 } from "uuid";

import { phrase } from "@gemunion/constants";
import firebase from "@gemunion/firebase";
import { useUser } from "@gemunion/provider-user";
import { MetaMaskIcon } from "@gemunion/provider-wallet";
import { useApiCall } from "@gemunion/react-hooks";
import { useMetamask } from "@gemunion/react-hooks-eth";
import type { IMetamaskDto } from "@gemunion/types-jwt";

import { StyledButton } from "./styled";

export const MetamaskButton = () => {
  const [data, setData] = useState<IMetamaskDto>({ nonce: "", signature: "", wallet: "" });

  const { account } = useWeb3React();
  const user = useUser();

  const [success, setSuccess] = useState<boolean>(false);
  const authFb = getAuth(firebase);

  const { fn: login, isLoading } = useApiCall((api, values: IMetamaskDto) => {
    return api.fetchJson({
      url: "/metamask/login",
      method: "POST",
      data: values,
    }) as Promise<{ token: string }>;
  });

  const handleLogin = useMetamask(
    async (web3Context: Web3ContextType) => {
      const fbContainer = document.getElementById("firebaseui-auth-container");
      if (fbContainer) {
        fbContainer.style.display = "none";
      }

      const wallet = web3Context.account!;
      const provider = web3Context.provider!;

      const signature = await provider.getSigner().signMessage(`${phrase}${data.nonce}`);
      setData({ ...data, wallet, signature });

      const token = await login(undefined, { wallet, nonce: data.nonce, signature });
      await signInWithCustomToken(authFb, token?.token || "");

      setSuccess(true);
      await user.logIn().catch(e => {
        console.error("login error", e);
        setSuccess(false);
      });
    },
    { success: false },
  );

  const handleClick = async () => {
    await handleLogin();
  };

  const userIsAuthenticated = user.isAuthenticated();

  useEffect(() => {
    if (!userIsAuthenticated) {
      setSuccess(false);
    }
  }, [userIsAuthenticated]);

  useEffect(() => {
    setData({ nonce: v4(), signature: "", wallet: account || "" });
  }, [account]);

  return success ? (
    <CircularProgress size={30} />
  ) : (
    <StyledButton
      disabled={isLoading}
      onClick={handleClick}
      startIcon={isLoading ? null : <MetaMaskIcon viewBox="9 5 50 50" />}
      fullWidth
    >
      {isLoading ? <CircularProgress size={20} /> : <FormattedMessage id="pages.guest.signInWithMetamask" />}
    </StyledButton>
  );
};
