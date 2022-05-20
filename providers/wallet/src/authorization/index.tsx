import { FC, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { useWeb3React } from "@web3-react/core";
import { v4 } from "uuid";

import { useApi, IMetamaskDto } from "@gemunion/provider-api";
import { IUser, useUser } from "@gemunion/provider-user";
import { phrase } from "@gemunion/constants";

import { useWallet } from "../provider";

interface IAuthorizationProps {
  targetChainIdHex: string;
}

export const Authorization: FC<IAuthorizationProps> = props => {
  const { targetChainIdHex } = props;
  const targetChainId = parseInt(targetChainIdHex, 16);

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { active, account, chainId, library } = useWeb3React();

  const api = useApi();
  const user = useUser<IUser>();
  const { handleDisconnect, handleLogout } = useWallet();

  const [data, setData] = useState<IMetamaskDto>({ nonce: "", signature: "", wallet: "" });

  const handleSubmit = async (values: IMetamaskDto): Promise<IUser | void> => {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json; charset=utf-8");

    return fetch(`${process.env.BE_URL}/auth/metamask`, {
      method: "POST",
      headers,
      body: values instanceof FormData ? values : JSON.stringify(values),
      credentials: "include",
      mode: "cors",
    })
      .then(response => {
        return response.json();
      })
      .then((json: any) => {
        if (json.statusCode) {
          throw json;
        } else {
          enqueueSnackbar(formatMessage({ id: "snackbar.authorized" }), { variant: "success" });
          api.setToken(json);

          return user.getProfile();
        }
      })
      .catch((e: any) => {
        api.setToken(null);
        handleDisconnect();
        if (e.statusCode) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message as string}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };

  const handleLogin = () => {
    if (!user.isAuthenticated()) {
      if (chainId === targetChainId || library.connection.url !== "metamask") {
        library
          .getSigner()
          .signMessage(`${phrase}${data.nonce}`)
          .then((signature: string) => {
            setData({ ...data, signature });
            return handleSubmit({ ...data, signature });
          })
          .catch((error: any) => {
            handleDisconnect();
            if (error.code === 4001) {
              enqueueSnackbar(formatMessage({ id: "snackbar.denied" }), { variant: "warning" });
            } else {
              console.error(error);
              enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
            }
          });
      }
    }
  };

  useEffect(() => {
    if (!api.isRefreshTokenExpired() && api.getToken()) {
      void user.getProfile().then(user => {
        if (api.getToken() && !user) {
          enqueueSnackbar(formatMessage({ id: "snackbar.userIsNotActive" }), { variant: "error" });
          return handleLogout();
        }

        return null;
      });
    }
  }, [api.getToken()?.accessToken]);

  useEffect(() => {
    setData({ nonce: v4(), signature: "", wallet: account || "" });
  }, [account]);

  useEffect(() => {
    if (active && data.wallet && account) {
      if (chainId !== targetChainId) {
        if (api.getToken()) {
          void user.logOut();
        }
      } else {
        handleLogin();
      }
    }
  }, [active, data.wallet, chainId, user.isAuthenticated()]);

  useEffect(() => {
    const handleAccountsChanged = async () => {
      if (api.getToken()) {
        await user.logOut();
      }
    };

    library?.provider.on("accountsChanged", handleAccountsChanged);

    return () => {
      library?.provider.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [library]);

  return null;
};
