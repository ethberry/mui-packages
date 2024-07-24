import { useLayoutEffect } from "react";

import { LOCAL_STORAGE_KEYS } from "@gemunion/constants";

import { walletActions } from "../reducer";

export const useReferrer = (dispatch: any) => {
  const searchParams = new URLSearchParams(window.location.search);

  useLayoutEffect(() => {
    const referrer = searchParams.get(LOCAL_STORAGE_KEYS.REFERRER);
    if (referrer) {
      void dispatch(walletActions.setReferrer(referrer));
      searchParams.delete(LOCAL_STORAGE_KEYS.REFERRER);

      const queryString = searchParams.toString();
      window.history.pushState({}, "", `?${queryString}`);
    }
  }, [searchParams]);
};
