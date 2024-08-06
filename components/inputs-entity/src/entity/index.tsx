import { ChangeEvent, FC, HTMLAttributes, ReactElement, useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { enqueueSnackbar } from "notistack";
import { Controller, get, useFormContext, useWatch } from "react-hook-form";
import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@mui/material";

import { useInputRegistry } from "@gemunion/mui-form";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { useApi } from "@gemunion/provider-api";
import { useTestId } from "@gemunion/provider-test-id";
import { useDeepCompareEffect } from "@gemunion/react-hooks";

import { IAutocompleteOption } from "../interfaces";

export interface IEntityInputProps {
  name: string;
  label?: string | number | ReactElement;
  placeholder?: string;
  controller: string;
  disabled?: boolean;
  readOnly?: boolean;
  disableClear?: boolean;
  multiple?: boolean;
  autoselect?: boolean;
  dirtyAutoselect?: boolean;
  getTitle?: (item: any) => string;
  data?: Record<string, any>;
  disabledOptions?: any[];
  variant?: "standard" | "filled" | "outlined";
  onChange?: (
    event: ChangeEvent<unknown>,
    options: ReadonlyArray<IAutocompleteOption> | IAutocompleteOption | null,
    reason: string,
  ) => void;
}

export const EntityInput: FC<IEntityInputProps> = props => {
  const {
    name,
    controller,
    getTitle,
    multiple,
    autoselect = false,
    dirtyAutoselect = true,
    data = {},
    disabledOptions = [],
    variant = "standard",
    onChange,
    label,
    placeholder,
    disabled,
    readOnly,
    disableClear,
  } = props;
  const suffix = name.split(".").pop() as string;

  const { registerInput, unregisterInput } = useInputRegistry();
  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const [open, setOpen] = useState(false);

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);
  const value = useWatch({ name });

  const { formatMessage } = useIntl();
  const localizedLabel = label ?? formatMessage({ id: `form.labels.${suffix}` });
  const localizedPlaceholder = placeholder ?? formatMessage({ id: `form.placeholders.${suffix}` });
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Array<IAutocompleteOption>>([]);

  const api = useApi();
  const abortController = new AbortController();

  const fetchOptions = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    return api
      .fetchJson({
        url: `/${controller}/autocomplete`,
        data,
        signal: abortController.signal,
      })
      .then((json: Array<any>) => {
        setOptions(json);
        if (autoselect) {
          const newValue = multiple ? [json[0]] : json[0];

          if (!newValue) {
            form.setValue(name, null, { shouldDirty: dirtyAutoselect });
            return;
          }

          const isValueNotExistInOptions =
            value &&
            (multiple
              ? value.some((v: number) => json.every((o: IAutocompleteOption) => o.id !== v))
              : json.every((o: IAutocompleteOption) => o.id !== value));

          if (!value || isValueNotExistInOptions) {
            onChange
              ? onChange({} as ChangeEvent<unknown>, newValue, "autoselect")
              : form.setValue(name, multiple ? newValue.map((o: IAutocompleteOption) => o.id) : newValue.id, {
                  shouldDirty: dirtyAutoselect,
                });
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [data, value, name, multiple, form]);

  useDeepCompareEffect(() => {
    void fetchOptions();

    return () => abortController.abort({ message: "AbortError" });
  }, [data]);

  useEffect(() => {
    registerInput(name, true);
    return () => {
      unregisterInput(name);
    };
  }, [name]);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => {
        if (multiple) {
          return (
            <ProgressOverlay isLoading={isLoading}>
              <Autocomplete
                open={open}
                onOpen={() => !readOnly && setOpen(true)}
                onClose={() => setOpen(false)}
                disableClearable={disableClear || readOnly}
                sx={{ my: 1 }}
                multiple={true}
                disabled={disabled}
                options={options}
                // preserve order
                value={value
                  .map((v: string | number) => options.find(o => o.id === v))
                  .filter((e: IAutocompleteOption | undefined) => e)}
                onChange={
                  onChange ||
                  ((_event: ChangeEvent<unknown>, options: ReadonlyArray<IAutocompleteOption> | null): void => {
                    const value = options ? options.map((option: IAutocompleteOption) => option.id) : [];
                    form.setValue(name, value, { shouldDirty: true, shouldTouch: true });
                  })
                }
                getOptionDisabled={(option: IAutocompleteOption) => !!disabledOptions.find(o => o?.id === option?.id)}
                getOptionLabel={(option: IAutocompleteOption) => (getTitle ? getTitle(option) : option.title)}
                renderOption={(props: HTMLAttributes<HTMLLIElement>, option: IAutocompleteOption) => {
                  const title = getTitle ? getTitle(option) : option.title;
                  return (
                    <li {...props} key={option.id}>
                      {title}
                    </li>
                  );
                }}
                renderInput={(params: AutocompleteRenderInputParams): ReactElement => (
                  <TextField
                    {...field}
                    {...params}
                    inputProps={{ ...params.inputProps, readOnly, ...testIdProps }}
                    InputProps={{ ...params.InputProps }}
                    label={localizedLabel}
                    placeholder={formatMessage({ id: `form.placeholders.${suffix}` })}
                    error={!!error}
                    helperText={localizedHelperText}
                    variant={variant}
                    onChange={() => {}}
                    onBlur={() => {
                      if (!readOnly) {
                        field.onBlur();
                      }
                    }}
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
                open={open}
                onOpen={() => !readOnly && setOpen(true)}
                onClose={() => setOpen(false)}
                disableClearable={disableClear || readOnly}
                sx={{ my: 1 }}
                multiple={false}
                disabled={disabled}
                options={options}
                value={options.find((option: IAutocompleteOption) => value === option.id) || null}
                onChange={
                  onChange ||
                  ((_event: ChangeEvent<unknown>, option: IAutocompleteOption | null): void => {
                    const value = option ? option.id : void 0;
                    form.setValue(name, value, { shouldDirty: true, shouldTouch: true });
                  })
                }
                getOptionDisabled={(option: IAutocompleteOption) => !!disabledOptions.find(o => o?.id === option?.id)}
                getOptionLabel={(option: IAutocompleteOption): string => (getTitle ? getTitle(option) : option.title)}
                renderOption={(props: HTMLAttributes<HTMLLIElement>, option: IAutocompleteOption) => {
                  const title = getTitle ? getTitle(option) : option.title;
                  return (
                    <li {...props} key={option.id}>
                      {title}
                    </li>
                  );
                }}
                renderInput={(params: AutocompleteRenderInputParams): ReactElement => (
                  <TextField
                    {...field}
                    {...params}
                    inputProps={{ ...params.inputProps, readOnly, ...testIdProps }}
                    InputProps={{ ...params.InputProps }}
                    label={localizedLabel}
                    placeholder={localizedPlaceholder}
                    error={!!error}
                    helperText={localizedHelperText}
                    variant={variant}
                    onChange={() => {}}
                    onBlur={() => {
                      if (!readOnly) {
                        field.onBlur();
                      }
                    }}
                    fullWidth
                  />
                )}
              />
            </ProgressOverlay>
          );
        }
      }}
    />
  );
};
