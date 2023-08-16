import { useEffect, useState } from "react";

import { ICosmosChain } from "../interfaces";

export interface IGetRegisteredChainsResponse {
  chains: ICosmosChain[];
}

export const useRegisteredChains = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registeredChains, setRegisteredChains] = useState<ICosmosChain[]>([]);

  const getRegisteredChains = async () => {
    setIsLoading(true);

    try {
      const response: IGetRegisteredChainsResponse = await window
        .fetch("https://chains.cosmos.directory")
        .then(res => res.json());
      setIsLoading(false);
      setRegisteredChains(response.chains);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (registeredChains.length === 0) {
      void getRegisteredChains();
    }
  }, [registeredChains]);

  return {
    isLoading,
    registeredChains,
  };
};
