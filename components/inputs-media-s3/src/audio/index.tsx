import { FC, ReactElement } from "react";
import { Box, FormControl, FormHelperText, Grid, IconButton, InputLabel, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DropzoneOptions } from "react-dropzone";
import { get, useFormContext, useWatch } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { clsx } from "clsx";

import { Accept, S3FileInput, useDeleteUrl } from "@gemunion/mui-inputs-file-s3";

import { ACCEPTED_FORMATS, MAX_FILE_SIZE } from "./constants";
import { useStyles } from "./styles";

export interface IAudioInputProps extends DropzoneOptions {
  name: string;
  label?: string | number | ReactElement;
  bucket?: string;
  accept?: Accept;
  classes?: {
    root?: string;
    audio?: string;
  };
}

export const AudioInput: FC<IAudioInputProps> = props => {
  const { accept = ACCEPTED_FORMATS, bucket, label, maxSize = MAX_FILE_SIZE, name } = props;

  const classes = useStyles();

  const { formatMessage } = useIntl();

  const deleteUrl = useDeleteUrl(bucket);

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);
  const value = get(useWatch(), name);

  const suffix = name.split(".").pop() as string;
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  const onChange = (url: string) => {
    form.setValue(name, url, { shouldTouch: true, shouldDirty: true });
    form.clearErrors(name);
    void form.trigger(name);
  };

  const onDelete = async () => {
    await deleteUrl(value);
    form.setValue(name, "", { shouldTouch: false, shouldDirty: true });
    await form.trigger(name);
  };

  if (value) {
    return (
      <FormControl fullWidth className={clsx(classes.root, props.classes?.root)}>
        <InputLabel id={`${name}-select-label`} shrink>
          {localizedLabel}
        </InputLabel>
        <Tooltip title={formatMessage({ id: "form.tips.delete" })}>
          <IconButton aria-label="delete" onClick={onDelete} size="medium" className={classes.button}>
            <Delete fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Box component="audio" controls className={clsx(classes.audio, props.classes?.audio)}>
          <Box component="source" src={value} type="audio/mpeg" />
        </Box>
        {localizedHelperText && (
          <FormHelperText id={`${name}-helper-text`} error>
            {localizedHelperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }

  return (
    <FormControl fullWidth className={clsx(classes.root, props.classes?.root)}>
      <InputLabel id={`${name}-select-label`} shrink>
        <FormattedMessage id={`form.labels.${name}`} />
      </InputLabel>
      <Grid container className={classes.container}>
        <Grid item>
          <S3FileInput
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
  );
};
