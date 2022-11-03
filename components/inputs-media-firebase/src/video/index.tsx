import { FC, ReactElement } from "react";
import { Box, FormControl, FormHelperText, Grid, IconButton, InputLabel, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DropzoneOptions } from "react-dropzone";
import { get, useFormContext, useWatch } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import { Accept, FirebaseFileInput, useDeleteUrl } from "@gemunion/mui-inputs-file-firebase";

import { ACCEPTED_FORMATS, MAX_FILE_SIZE } from "./constants";

export interface IVideoInputProps extends DropzoneOptions {
  name: string;
  label?: string | number | ReactElement;
  bucket?: string;
  accept?: Accept;
}

export const VideoInput: FC<IVideoInputProps> = props => {
  const { accept = ACCEPTED_FORMATS, bucket, label, maxSize = MAX_FILE_SIZE, name } = props;

  const { formatMessage } = useIntl();

  const deleteUrl = useDeleteUrl(bucket);

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);
  const value = get(useWatch(), name);

  const suffix = name.split(".").pop() as string;
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  const onChange = (urls: Array<string>) => {
    form.setValue(name, urls[0], { shouldTouch: true });
    form.clearErrors(name);
  };

  const onDelete = async () => {
    await deleteUrl(value);
    form.setValue(name, "");
  };

  if (value) {
    return (
      <Box sx={{ width: "100%" }}>
        <FormControl fullWidth sx={{ mt: 2, width: 350, height: 300, position: "relative" }}>
          <InputLabel id={`${name}-select-label`} shrink>
            {localizedLabel}
          </InputLabel>
          <Tooltip title={formatMessage({ id: "form.tips.delete" })}>
            <IconButton
              aria-label="delete"
              onClick={onDelete}
              size="medium"
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <Delete fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Box component="video" width="320px" height="240px" controls sx={{ mt: 2 }}>
            <Box component="source" src={value} />
          </Box>
          {localizedHelperText && (
            <FormHelperText id={`${name}-helper-text`} error>
              {localizedHelperText}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
      <FormControl fullWidth sx={{ position: "relative" }}>
        <InputLabel id={`${name}-select-label`} shrink>
          <FormattedMessage id={`form.labels.${name}`} />
        </InputLabel>
        <Grid container sx={{ mt: 1 }}>
          <Grid item>
            <FirebaseFileInput
              label={label}
              name={name}
              onChange={onChange}
              bucket={bucket}
              accept={accept}
              maxSize={maxSize}
              maxFiles={1}
            />
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );
};
