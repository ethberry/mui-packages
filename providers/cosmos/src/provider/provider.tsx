import { FC, PropsWithChildren, useEffect, useState } from "react";

import { useLicense } from "@gemunion/provider-license";
import { usePopup } from "@gemunion/provider-popup";
import { useUser } from "@gemunion/provider-user";

import { useRegisteredChains } from "../hooks";
import { ICosmosChain, IUserAccount } from "../interfaces";
import { CosmosContext } from "./context";
import { COSMOS_CONNECT_POPUP_TYPE } from "./constants";

export interface ICosmosProviderProps {
  enabledChains: string[];
}

export const CosmosProvider: FC<PropsWithChildren<ICosmosProviderProps>> = props => {
  const { children, enabledChains } = props;

  const license = useLicense();
  const { openPopup, closePopup, isOpenPopup } = usePopup();
  const { profile } = useUser<any>();
  const { registeredChains } = useRegisteredChains();

  const [account, setAccount] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<IUserAccount[]>([]);
  const [chain, setChain] = useState<ICosmosChain | null>(null);
  const [isKeplrConnected, setIsKeplrConnected] = useState<boolean>(false);

  const openConnectCosmosDialog = (): Promise<any> => {
    openPopup(COSMOS_CONNECT_POPUP_TYPE);

    return Promise.resolve();
  };

  const isDialogOpen = (): boolean => {
    return isOpenPopup(COSMOS_CONNECT_POPUP_TYPE);
  };

  const closeConnectCosmosDialog = (): void => {
    closePopup();
  };

  useEffect(() => {
    if (profile?.chainId && registeredChains.length > 0) {
      const foundChain = registeredChains.find(registeredChain => registeredChain.chain_id === profile.chainId);
      setChain(foundChain || null);
    }
  }, [profile, registeredChains]);

  if (!license.isValid()) {
    return null;
  }

  return (
    <CosmosContext.Provider
      value={{
        account,
        accounts,
        setAccounts,
        chain,
        enabledChains,
        closeConnectCosmosDialog,
        isDialogOpen,
        isKeplrConnected,
        openConnectCosmosDialog,
        registeredChains,
        setAccount,
        setChain,
        setIsKeplrConnected,
      }}
    >
      <>{children}</>
    </CosmosContext.Provider>
  );
};
