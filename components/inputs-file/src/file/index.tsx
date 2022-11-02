import { FC, ReactElement, useCallback } from "react";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";
import { CloudOff, CloudUpload, CloudUploadOutlined } from "@mui/icons-material";
import { FormHelperText } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { Controller, get, useFormContext } from "react-hook-form";

import { useTestId } from "@gemunion/provider-test-id";

import { ACCEPTED_FORMATS, MAX_FILE_SIZE, MIN_FILE_SIZE } from "./constants";
import { getSxArray, humanFileSize } from "./utils";
import { StyledWrapper, StyledPlaceholder, StyledIcon } from "./styled";

export interface IFileInputProps extends DropzoneOptions {
  name: string;
  label?: string | number | ReactElement;
  onChange: (files: Array<File>) => void;
  rootSx?: SxProps<Theme>;
  activeSx?: SxProps<Theme>;
  inactiveSx?: SxProps<Theme>;
  disabledSx?: SxProps<Theme>;
}

export const FileInput: FC<IFileInputProps> = props => {
  const {
    name,
    label,
    onChange,
    disabled,
    accept = ACCEPTED_FORMATS,
    minSize = MIN_FILE_SIZE,
    maxSize = MAX_FILE_SIZE,
    rootSx = [],
    activeSx = [],
    inactiveSx = [],
    disabledSx = [],
    ...rest
  } = props;
  const { formatMessage } = useIntl();
  const { enqueueSnackbar } = useSnackbar();

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
      <StyledPlaceholder sx={getSxArray(rootSx)}>
        <StyledIcon component={CloudOff} sx={getSxArray(disabledSx)} />
      </StyledPlaceholder>
    );
  }

  return (
    <StyledWrapper>
      <StyledPlaceholder {...getRootProps()} sx={getSxArray(rootSx)}>
        <Controller
          name={name}
          control={form.control}
          render={({ field: { value: _value, ...field } }) => {
            // field should come before getInputProps
            return <input {...field} {...getInputProps()} {...testIdProps} />;
          }}
        />
        {isDragActive ? (
          <StyledIcon component={CloudUploadOutlined} sx={getSxArray(activeSx)} />
        ) : (
          <StyledIcon component={CloudUpload} sx={getSxArray(inactiveSx)} />
        )}
      </StyledPlaceholder>
      {localizedHelperText && (
        <FormHelperText id={`${name}-helper-text`} error>
          {localizedHelperText}
        </FormHelperText>
      )}
    </StyledWrapper>
  );
};
