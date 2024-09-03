import { ChangeEvent, FC, HTMLAttributes, ReactElement, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Controller, get, useFormContext, useWatch } from "react-hook-form";
import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@mui/material";

import { useInputRegistry } from "@gemunion/mui-form";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { useTestId } from "@gemunion/provider-test-id";
import { useDeepCompareEffect } from "@gemunion/react-hooks";

import { IAutocompleteOption, INoContentEntity } from "../interfaces";
import { useEntity } from "../useEntity";

export interface IEntityInputProps extends INoContentEntity {
  label?: string | number | ReactElement;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  disableClear?: boolean;
  getTitle?: (item: any) => string;
  disabledOptions?: any[];
  optionKey?: keyof IAutocompleteOption;
  variant?: "standard" | "filled" | "outlined";
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
    required,
    optionKey = "id",
  } = props;

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Array<IAutocompleteOption>>([]);

  const { registerInput, unregisterInput } = useInputRegistry();
  const { testId } = useTestId();
  const { formatMessage } = useIntl();

  const suffix = name.split(".").pop() as string;
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const { fetchOptions, abortController } = useEntity({
    controller,
    name,
    data,
    dirtyAutoselect,
    multiple,
    autoselect,
    onChange,
    setOptions,
  });

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);
  const value = useWatch({ name });

  const localizedLabel = label ?? `${formatMessage({ id: `form.labels.${suffix}` })}`;
  const localizedPlaceholder = placeholder ?? formatMessage({ id: `form.placeholders.${suffix}` });
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  useDeepCompareEffect(() => {
    setIsLoading(true);
    void fetchOptions().finally(() => {
      setIsLoading(false);
    });

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
                value={options.find((option: IAutocompleteOption) => value === option[optionKey]) || null}
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
                    required={required}
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
