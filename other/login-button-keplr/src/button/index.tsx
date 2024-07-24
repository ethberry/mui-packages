import { FC, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { v4 } from "uuid";

import { phrase } from "@gemunion/constants";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { useUser } from "@gemunion/provider-user";
import { KeplrIcon, useCosmos } from "@gemunion/provider-cosmos";
import { useApiCall } from "@gemunion/react-hooks";
import { useKeplr } from "@gemunion/react-hooks-cosmos";
import type { IKeplrDto } from "@gemunion/types-jwt";
import type { IFirebaseLoginButtonProps } from "@gemunion/firebase-login";

import { StyledButton } from "./styled";

export const KeplrLoginButton: FC<IFirebaseLoginButtonProps> = props => {
  const { onTokenVerified } = props;

  const user = useUser<any>();
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
        const nonce = v4();
        const signature = await keplr.signArbitrary(chainId, wallet, `${phrase}${nonce}`);
        const token = await getVerifiedToken(void 0, { wallet, nonce, signature, chainPrefix });
        await onTokenVerified(token?.token || "");
      } catch (e) {
        console.error(e);
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

  return (
    <ProgressOverlay isLoading={isLoading}>
      <StyledButton
        onClick={handleClick}
        startIcon={<KeplrIcon viewBox="0 0 60 60" />}
        disabled={isVerifying}
        fullWidth
      >
        <FormattedMessage id="pages.guest.signInWith.keplr" />
      </StyledButton>
    </ProgressOverlay>
  );
};
