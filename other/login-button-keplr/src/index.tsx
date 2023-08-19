import { FC, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { StdSignature } from "@keplr-wallet/types";
import { v4 } from "uuid";

import { phrase } from "@gemunion/constants";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { useUser } from "@gemunion/provider-user";
import { KeplrIcon, useCosmos } from "@gemunion/provider-cosmos";
import { useApiCall } from "@gemunion/react-hooks";
import { useKeplr } from "@gemunion/react-hooks-cosmos";
import type { IKeplrDto, IWalletLoginButtonProps } from "@gemunion/types-jwt";

import { StyledButton } from "./styled";

const emptySignature: StdSignature = {
  pub_key: {
    type: "",
    value: "",
  },
  signature: "",
};

export const KeplrLoginButton: FC<IWalletLoginButtonProps> = props => {
  const { onWalletVerified } = props;
  const [data, setData] = useState<IKeplrDto>({
    nonce: "",
    signature: emptySignature,
    wallet: "",
    chainPrefix: "",
  });

  const user = useUser<any>();
  const [account, setAccount] = useState("");
  const { enabledChains } = useCosmos();
  const chainId = enabledChains[1];

  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const { fn: getVerifiedToken, isLoading } = useApiCall(
    (api, values: IKeplrDto) => {
      return api
        .fetchJson({
          url: "/keplr/login",
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

  const handleLogin = useKeplr(
    async cosmosParams => {
      const { keplr, getOfflineSigner } = cosmosParams;

      try {
        setIsVerifying(true);

        const chainInfo = await keplr.getChainInfosWithoutEndpoints();
        const offlineSigner = getOfflineSigner(chainId);
        const chainPrefix = chainInfo.find(chain => chain.chainId === chainId)!.bech32Config.bech32PrefixAccAddr;
        const keplrAccounts = await offlineSigner.getAccounts();
        const wallet = keplrAccounts[0].address;
        setAccount(wallet);

        const signature = await keplr.signArbitrary(chainId, wallet, `${phrase}${data.nonce}`);
        setData({ ...data, wallet, signature, chainPrefix });

        const token = await getVerifiedToken(void 0, { wallet, nonce: data.nonce, signature, chainPrefix });
        await onWalletVerified(token?.token || "");
      } catch (error) {
        console.error(error);
        setIsVerifying(false);
      }
    },
    { success: false },
  );

  const handleClick = async () => {
    await handleLogin();
  };

  const userIsAuthenticated = user.isAuthenticated();

  useEffect(() => {
    if (!userIsAuthenticated) {
      setIsVerifying(false);
    }
  }, [userIsAuthenticated]);

  useEffect(() => {
    setData({ nonce: v4(), signature: emptySignature, wallet: account, chainPrefix: "" });
  }, [account]);

  return (
    <ProgressOverlay isLoading={isLoading}>
      <StyledButton
        onClick={handleClick}
        startIcon={<KeplrIcon viewBox="0 0 42 42" />}
        disabled={isVerifying}
        fullWidth
      >
        <FormattedMessage id="pages.guest.signInWithKeplr" />
      </StyledButton>
    </ProgressOverlay>
  );
};
