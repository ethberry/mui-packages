import { FC, ReactElement } from "react";
import { get, useFormContext, useWatch } from "react-hook-form";
import { Box, FormControl, FormHelperText, Grid, IconButton, InputLabel, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FormattedMessage, useIntl } from "react-intl";
import { clsx } from "clsx";

import { S3FileInput, useDeleteUrl, Accept } from "@gemunion/mui-inputs-file-s3";

import { useStyles } from "./styles";

export interface IImageInputProps {
  name: string;
  label?: string | number | ReactElement;
  bucket?: string;
  accept?: Accept;
  classes?: {
    root?: string;
    image?: string;
  };
}

export const ImageInput: FC<IImageInputProps> = props => {
  const { name, label, bucket, accept } = props;

  const classes = useStyles();

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);

  const value = get(useWatch(), name);

  const { formatMessage } = useIntl();
  const deleteUrl = useDeleteUrl(bucket);
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
        <Box
          component="img"
          src={value}
          alt={formatMessage({ id: `form.labels.${name}` })}
          className={clsx(classes.image, props.classes?.image)}
        />
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
          <S3FileInput label={label} name={name} onChange={onChange} bucket={bucket} accept={accept} maxFiles={1} />
        </Grid>
      </Grid>
    </FormControl>
  );
};
