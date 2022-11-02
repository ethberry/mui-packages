import { FC, ReactElement } from "react";
import { FormControl, FormHelperText, Grid, IconButton, InputLabel, Tooltip } from "@mui/material";
import { VolumeOff, Delete } from "@mui/icons-material";
// import { useSnackbar } from "notistack";
import { DropzoneOptions } from "react-dropzone";
import { get, useFormContext, useWatch } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

// import { ACCEPTED_FORMATS, MAX_FILE_SIZE } from "./constants";
// import { humanFileSize } from "@gemunion/mui-inputs-file";
import { Accept, FirebaseFileInput, useDeleteUrl } from "@gemunion/mui-inputs-file-firebase";

export interface IAudioInputProps extends DropzoneOptions {
  name: string;
  label?: string | number | ReactElement;
  bucket?: string;
  accept?: Accept;
}

export const AudioInput: FC<IAudioInputProps> = props => {
  const {
    accept,
    bucket,
    disabled,
    label,
    // maxSize,
    name,
    // ...rest
  } = props;

  const { formatMessage } = useIntl();
  // const { enqueueSnackbar } = useSnackbar();

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

  if (disabled) {
    return (
      <IconButton>
        <VolumeOff />
      </IconButton>
    );
  }

  if (value) {
    return (
      <FormControl fullWidth sx={{ mt: 2, height: 200, width: 200, position: "relative" }}>
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
        {/* <Box */}
        {/*  component="audio" */}
        {/*  src={value} */}
        {/*  alt={formatMessage({ id: `form.labels.${name}` })} */}
        {/*  sx={{ */}
        {/*    height: 200, */}
        {/*    width: 200, */}
        {/*    borderRadius: "50%", */}
        {/*    borderColor: "#fff", */}
        {/*    borderStyle: "solid", */}
        {/*    borderWidth: 0, */}
        {/*    overflow: "hidden", */}
        {/*    backgroundSize: "contain", */}
        {/*    backgroundRepeat: "no-repeat", */}
        {/*    backgroundPosition: "center", */}
        {/*  }} */}
        {/* /> */}
        {localizedHelperText && (
          <FormHelperText id={`${name}-helper-text`} error>
            {localizedHelperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }

  return (
    <FormControl fullWidth sx={{ mt: 2, height: 200, width: 200, position: "relative" }}>
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
            noClick
            noKeyboard
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};
