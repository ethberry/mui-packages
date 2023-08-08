import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { FormattedMessage } from "react-intl";
import { StdSignature } from "@keplr-wallet/types";
import { v4 } from "uuid";

import { phrase } from "@gemunion/constants";
import firebase from "@gemunion/firebase";
import { useUser } from "@gemunion/provider-user";
import { useApiCall } from "@gemunion/react-hooks";
import type { IKeplrDto } from "@gemunion/types-jwt";

import { StyledButton } from "./styled";
import { KeplrIcon } from "./icon";

const emptySignature: StdSignature = {
  pub_key: {
    type: "",
    value: "",
  },
  signature: "",
};

export const KeplrButton = () => {
  const [data, setData] = useState<IKeplrDto>({
    nonce: "",
    signature: emptySignature,
    wallet: "",
    chainPrefix: "",
  });

  const [account, setAccount] = useState("");
  const user = useUser<any>();
  const chainId = "haqq_11235-1";

  const [success, setSuccess] = useState<boolean>(false);
  const authFb = getAuth(firebase);

  const { fn: login, isLoading } = useApiCall((api, values: IKeplrDto) => {
    return api.fetchJson({
      url: "/keplr/login",
      method: "POST",
      data: values,
    }) as Promise<{ token: string }>;
  });

  const handleLogin = async () => {
    const fbContainer = document.getElementById("firebaseui-auth-container");
    if (fbContainer) {
      fbContainer.style.opacity = "0";
    }

    if (window.keplr && window.getOfflineSigner) {
      await window.keplr.enable(chainId);

      const chainInfo = await window.keplr.getChainInfosWithoutEndpoints();
      const chainPrefix = chainInfo.find(chain => chain.chainId === chainId)!.bech32Config.bech32PrefixAccAddr;
      const offlineSigner = window.getOfflineSigner(chainId);
      const keplrAccounts = await offlineSigner.getAccounts();
      const wallet = keplrAccounts[0].address;

      setAccount(wallet);

      const signature = await window.keplr.signArbitrary(chainId, wallet, `${phrase}${data.nonce}`);

      setData({ ...data, wallet, signature, chainPrefix });

      const token = await login(undefined, { wallet, nonce: data.nonce, signature, chainPrefix });
      await signInWithCustomToken(authFb, token?.token || "");

      setSuccess(true);
      await user.logIn().catch(e => {
        console.error("login error", e);
        setSuccess(false);
      });
    } else {
      alert("Keplr extension is not installed.");
    }
  };

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
    setData({ nonce: v4(), signature: emptySignature, wallet: account, chainPrefix: "" });
  }, [account]);

  return success ? (
    <CircularProgress size={30} />
  ) : (
    <StyledButton
      disabled={isLoading}
      onClick={handleClick}
      startIcon={isLoading ? null : <KeplrIcon viewBox="0 0 42 42" />}
      fullWidth
    >
      {isLoading ? <CircularProgress size={20} /> : <FormattedMessage id="pages.guest.signInWithKeplr" />}
    </StyledButton>
  );
};
