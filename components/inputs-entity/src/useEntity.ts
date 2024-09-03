import { ChangeEvent, useCallback } from "react";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { get, useFormContext, useWatch } from "react-hook-form";

import { useApi } from "@gemunion/provider-api";

import { IAutocompleteOption, INoContentEntity } from "./interfaces";

type UseFetchEntityConfig = INoContentEntity & { setOptions?: (value: Array<IAutocompleteOption>) => void };

export const useEntity = (config: UseFetchEntityConfig) => {
  const { name, controller, data, multiple, autoselect = false, dirtyAutoselect = true, onChange, setOptions } = config;

  const { formatMessage } = useIntl();

  const form = useFormContext<any>();
  const value = useWatch({ name });
  const error = get(form.formState.errors, name);

  const api = useApi();

  const abortController = new AbortController();

  const fetchOptions = useCallback(async (): Promise<void> => {
    return api
      .fetchJson({
        url: `/${controller}/autocomplete`,
        data,
        signal: abortController.signal,
      })
      .then((json: Array<any>) => {
        if (setOptions) {
          setOptions(json);
        }

        if (autoselect) {
          const newValue = multiple ? [json[0]] : json[0];

          if (!newValue) {
            form.setValue(name, null, {
              shouldDirty: dirtyAutoselect,
            });
            return;
          }

          const isValueNotExistInOptions =
            value &&
            (multiple
              ? value.some((v: number) => json.every((o: IAutocompleteOption) => o.id !== v))
              : json.every((o: IAutocompleteOption) => o.id !== value));

          if (!value || isValueNotExistInOptions) {
            if (onChange) {
              onChange({} as ChangeEvent<unknown>, newValue, "autoselect");
            } else {
              form.setValue(name, multiple ? newValue.map((o: IAutocompleteOption) => o.id) : newValue.id, {
                shouldDirty: dirtyAutoselect,
              });
            }
            if (error) {
              void form.trigger(name);
            }
          }
        }
      })
      .catch(e => {
        if (!e.message.includes("The user aborted a request") && !e.message.includes("AbortError")) {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  }, [data, value, name, multiple, form]);

  return {
    fetchOptions,
    abortController,
    formatMessage,
  };
};
