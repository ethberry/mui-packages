import { FC, ReactElement } from "react";
import { get, useFormContext, useWatch } from "react-hook-form";
import { Box, FormControl, FormHelperText, Grid, IconButton, InputLabel, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FormattedMessage, useIntl } from "react-intl";

import { FirebaseFileInput, useDeleteUrl, Accept } from "@ethberry/mui-inputs-file-firebase";

export interface IAvatarInputProps {
  name: string;
  label?: string | number | ReactElement;
  bucket?: string;
  accept?: Accept;
  required?: boolean;
}

export const AvatarInput: FC<IAvatarInputProps> = props => {
  const { name, label, bucket, accept, required } = props;

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);

  const value = get(useWatch(), name);

  const { formatMessage } = useIntl();
  const deleteUrl = useDeleteUrl(bucket);
  const suffix = name.split(".").pop()!;
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  const onChange = (urls: Array<string>) => {
    form.setValue(name, urls[0], { shouldTouch: true, shouldDirty: true });
    form.clearErrors(name);
    void form.trigger(name);
  };

  const onDelete = async () => {
    await deleteUrl(value);
    form.setValue(name, "", { shouldTouch: true, shouldDirty: true });
    void form.trigger(name);
  };

  if (value) {
    return (
      <FormControl fullWidth sx={{ mt: 2, height: 200, width: 200, position: "relative" }} required={required}>
        <InputLabel id={`${name}-select-label`} shrink>
          {localizedLabel}
        </InputLabel>
        <Tooltip title={formatMessage({ id: "form.tips.delete" })}>
          <IconButton
            aria-label="delete"
            onClick={onDelete}
            size="medium"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <Delete fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Box
          component="img"
          src={value}
          alt={formatMessage({ id: `form.labels.${name}` })}
          sx={{
            height: 200,
            width: 200,
            borderRadius: "50%",
            borderColor: "#fff",
            borderStyle: "solid",
            borderWidth: 0,
            overflow: "hidden",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            objectFit: "cover",
          }}
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
    <FormControl fullWidth sx={{ mt: 2, height: 200, width: 200, position: "relative" }} required={required}>
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
            maxFiles={1}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};
