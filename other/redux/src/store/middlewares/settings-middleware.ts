import {
  LAYOUT_DIRECTION,
  LOCAL_STORAGE_KEYS,
  RTLLanguages,
  LAYOUT_SLICE_NAME,
  SET_ACTIVE_CONNECTOR_ACTION_TYPE,
  SET_LANGUAGE_ACTION_TYPE,
  SET_LAYOUT_DIRECTION_ACTION_TYPE,
  SET_LAYOUT_THEME_ACTION_TYPE,
  SET_REFERRER_ACTION_TYPE,
} from "@ethberry/constants";
import { saveToLS } from "@ethberry/utils";

const actionsHandle: Record<string, (action: any, api: any) => void> = {
  [SET_REFERRER_ACTION_TYPE]: action => {
    saveToLS(LOCAL_STORAGE_KEYS.REFERRER, action.payload);
  },
  [SET_ACTIVE_CONNECTOR_ACTION_TYPE]: action => {
    saveToLS(LOCAL_STORAGE_KEYS.STORE_CONNECTOR, action.payload);
  },
  [SET_LANGUAGE_ACTION_TYPE]: (action, api) => {
    const state = api.getState();
    saveToLS(LOCAL_STORAGE_KEYS.LANGUAGE, action.payload);
    saveToLS(LOCAL_STORAGE_KEYS.LAYOUT, {
      layoutDirection: action.payload === RTLLanguages.AR ? LAYOUT_DIRECTION.rtl : LAYOUT_DIRECTION.ltr,
      themeType: state[LAYOUT_SLICE_NAME].themeType,
    });
  },
  [SET_LAYOUT_DIRECTION_ACTION_TYPE]: (action, api) => {
    const state = api.getState();
    saveToLS(LOCAL_STORAGE_KEYS.LAYOUT, {
      layoutDirection: action.payload,
      themeType: state[LAYOUT_SLICE_NAME].themeType,
    });
  },
  [SET_LAYOUT_THEME_ACTION_TYPE]: (action, api) => {
    const state = api.getState();
    saveToLS(LOCAL_STORAGE_KEYS.LAYOUT, {
      layoutDirection: state[LAYOUT_SLICE_NAME].layoutDirection,
      themeType: action.payload,
    });
  },
};

export const settingsMiddleware = (api: any) => {
  return (next: any) =>
    (action: any): unknown => {
      if (Object.keys(actionsHandle).includes(action.type)) {
        actionsHandle[action.type](action, api);
      }
      return next(action);
    };
};
