import React, { useState, useEffect, ComponentType, FC } from "react";

import { useApiCall } from "@gemunion/react-hooks";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { useAppDispatch } from "@gemunion/redux";

import { initializeActiveConnector, walletActions } from "../reducer";

export const withNetworksFetching = (WrappedComponent: ComponentType) => {
  const WithDataFetchingComponent: FC = props => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { setNetworks } = walletActions;

    const { fn: fetchNetworksFn } = useApiCall(
      api => {
        return api.fetchJson({
          url: "/network",
        });
      },
      { success: false, error: false },
    );

    useEffect(() => {
      const fetchNetworks = async () => {
        try {
          const networks = await fetchNetworksFn();
          if (networks) {
            dispatch(setNetworks(networks));
          }
        } catch (e) {
          console.error("error", e);
        } finally {
          setIsLoading(false);
        }
      };

      void dispatch(initializeActiveConnector());
      void fetchNetworks();
    }, []);

    if (isLoading) {
      return (
        <ProgressOverlay
          spinnerSx={{
            position: "static",
            minHeight: "100vh",
          }}
          isLoading={isLoading}
        />
      );
    }

    return <WrappedComponent {...props} />;
  };

  return WithDataFetchingComponent;
};
