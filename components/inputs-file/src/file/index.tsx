import { FC, ReactElement, useCallback } from "react";
import { clsx } from "clsx";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";
import { CloudOff, CloudUpload, CloudUploadOutlined } from "@mui/icons-material";
import { Box, FormHelperText } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { Controller, get, useFormContext } from "react-hook-form";

import { ProgressOverlay } from "@ethberry/mui-page-layout";
import { useTestId } from "@ethberry/provider-test-id";

import { ACCEPTED_FORMATS, MAX_FILE_SIZE, MIN_FILE_SIZE } from "./constants";
import { humanFileSize } from "./utils";
import { useStyles } from "./styles";

export interface IFileInputProps extends DropzoneOptions {
  name: string;
  label?: string | number | ReactElement;
  isLoading?: boolean;
  onChange: (files: Array<File>) => void;
  classes?: {
    root?: string;
    active?: string;
    inactive?: string;
    disabled?: string;
  };
}

export const FileInput: FC<IFileInputProps> = props => {
  const {
    name,
    label,
    isLoading = false,
    onChange,
    disabled,
    accept = ACCEPTED_FORMATS,
    minSize = MIN_FILE_SIZE,
    maxSize = MAX_FILE_SIZE,
    ...rest
  } = props;
  const classes = useStyles();
  const { formatMessage } = useIntl();

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-FileInput` } : {};

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);

  const suffix = name.split(".").pop() as string;
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    console.info("acceptedFiles", acceptedFiles);
    console.info("rejectedFiles", rejectedFiles);

    if (rejectedFiles.length) {
      rejectedFiles.forEach(rejectedFile => {
        rejectedFile.errors.forEach(({ code }) => {
          enqueueSnackbar(
            formatMessage(
              { id: `components.dropzone.${code}` },
              {
                // chrome does not report filetype on drag&drop
                type: rejectedFile.file.type || `.${rejectedFile.file.name.split(".").pop() || ""}` || "UNKNOWN",
                accept: ([] as Array<string>).concat(...Object.values(accept)).join(", "),
                size: humanFileSize(rejectedFile.file.size),
                minSize: humanFileSize(minSize),
                maxSize: humanFileSize(maxSize),
              },
            ),
            { variant: "error" },
          );
        });
      });
    }

    if (acceptedFiles.length) {
      onChange(acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    minSize,
    maxSize,
    ...rest,
  });

  if (disabled) {
    return (
      <Box className={clsx(classes.placeholder, props.classes?.root)}>
        <CloudOff className={clsx(classes.icon, props.classes?.disabled)} />
      </Box>
    );
  }

  return (
    <Box className={classes.wrapper}>
      <ProgressOverlay isLoading={isLoading}>
        <Box {...getRootProps()} className={clsx(classes.placeholder, props.classes?.root)}>
          <Controller
            name={name}
            control={form.control}
            render={({ field: { value: _value, ...field } }) => {
              // field should come before getInputProps
              return <input {...field} {...getInputProps()} {...testIdProps} />;
            }}
          />
          {isDragActive ? (
            <CloudUploadOutlined className={clsx(classes.icon, props.classes?.active)} />
          ) : (
            <CloudUpload className={clsx(classes.icon, props.classes?.inactive)} />
          )}
        </Box>
        {localizedHelperText && (
          <FormHelperText id={`${name}-helper-text`} error>
            {localizedHelperText}
          </FormHelperText>
        )}
      </ProgressOverlay>
    </Box>
  );
};
