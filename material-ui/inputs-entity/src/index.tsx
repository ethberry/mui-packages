import React, { ChangeEvent, FC, ReactElement, useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSnackbar } from "notistack";
import { getIn, useFormikContext } from "formik";
import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@material-ui/core";

import { ProgressOverlay } from "@gemunion/material-ui-progress";
import { ApiContext } from "@gemunion/provider-api";

export interface IAutocompleteOption {
  id: string | number;
  title: string;
  [key: string]: string | number;
}

export interface IEntityInputProps {
  name: string;
  controller: string;
  multiple?: boolean;
  getTitle?: (item: any) => string;
  data?: Record<string, any>;
  onChange?: (event: ChangeEvent<unknown>, options: Array<IAutocompleteOption> | IAutocompleteOption | null) => void;
}

export const EntityInput: FC<IEntityInputProps> = props => {
  const { name, controller, getTitle, multiple, data, onChange } = props;
  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);
  const value = getIn(formik.values, name);

  const { formatMessage } = useIntl();
  const localizedLabel = formatMessage({ id: `form.labels.${suffix}` });
  const localizedPlaceholder = formatMessage({ id: `form.placeholders.${suffix}` });
  const localizedHelperText = error && touched ? formatMessage({ id: error }, { label: localizedLabel }) : "";

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Array<IAutocompleteOption>>([]);

  const { enqueueSnackbar } = useSnackbar();
  const api = useContext(ApiContext);

  const fetchOptions = async (): Promise<void> => {
    setIsLoading(true);
    return api
      .fetchJson({
        url: `/${controller}/autocomplete`,
        data,
      })
      .then((json: Array<any>) => {
        setOptions(json);
      })
      .catch(e => {
        console.error(e);
        enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    void fetchOptions();
  }, []);

  if (multiple) {
    return (
      <ProgressOverlay isLoading={isLoading}>
        <Autocomplete
          multiple={true}
          options={options}
          // preserve order
          value={value
            .map((v: string | number) => options.find(o => o.id === v))
            .filter((e: IAutocompleteOption | undefined) => e)}
          // value={options.filter((option: IAutocompleteOption) => value.includes(option.id) as boolean)}
          onChange={
            onChange ||
            ((_event: ChangeEvent<unknown>, options: Array<IAutocompleteOption> | null): void => {
              const value = options ? options.map((option: IAutocompleteOption) => option.id) : [];
              formik.setFieldValue(name, value);
            })
          }
          getOptionLabel={(option: IAutocompleteOption) => (getTitle ? getTitle(option) : option.title)}
          renderInput={(params: AutocompleteRenderInputParams): ReactElement => (
            <TextField
              {...params}
              label={formatMessage({ id: `form.labels.${suffix}` })}
              placeholder={formatMessage({ id: `form.placeholders.${suffix}` })}
              error={!!error}
              helperText={localizedHelperText}
              fullWidth
            />
          )}
        />
      </ProgressOverlay>
    );
  } else {
    return (
      <ProgressOverlay isLoading={isLoading}>
        <Autocomplete
          multiple={false}
          options={options}
          value={options.find((option: IAutocompleteOption) => value === option.id) || null}
          onChange={
            onChange ||
            ((_event: ChangeEvent<unknown>, option: IAutocompleteOption | null): void => {
              const value = option ? option.id : null;
              formik.setFieldValue(name, value);
            })
          }
          getOptionLabel={(option: IAutocompleteOption): string => (getTitle ? getTitle(option) : option.title)}
          renderInput={(params: AutocompleteRenderInputParams): ReactElement => (
            <TextField
              {...params}
              label={localizedLabel}
              placeholder={localizedPlaceholder}
              error={error && touched}
              helperText={localizedHelperText}
              fullWidth
            />
          )}
        />
      </ProgressOverlay>
    );
  }
};
