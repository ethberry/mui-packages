import { FC, useCallback } from "react";
import clsx from "clsx";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";
import { CloudUpload, CloudUploadOutlined, CloudOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { ACCEPTED_FORMATS, MAX_FILE_SIZE } from "./constants";
import { humanFileSize } from "./utils";
import { useStyles } from "./styles";

export interface IFileInputProps extends DropzoneOptions {
  classes?: {
    root?: string;
    active?: string;
    inactive?: string;
    disabled?: string;
  };
  onChange: (files: Array<File>) => void;
}

export const FileInput: FC<IFileInputProps> = props => {
  const { disabled, onChange, accept = ACCEPTED_FORMATS, maxSize = MAX_FILE_SIZE, ...rest } = props;
  const classes = useStyles();
  const { formatMessage } = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length) {
      rejectedFiles.forEach(rejectedFile => {
        console.info("rejectedFiles", rejectedFiles);
        if (!accept.includes(rejectedFile.file.type)) {
          enqueueSnackbar(
            formatMessage(
              { id: "components.dropzone.format" },
              {
                type: rejectedFile.file.type,
                accept: Array.isArray(accept) ? accept.join(", ") : accept,
              },
            ),
            { variant: "error" },
          );
        } else if (maxSize < rejectedFile.file.size) {
          enqueueSnackbar(
            formatMessage(
              { id: "components.dropzone.size" },
              {
                size: humanFileSize(rejectedFile.file.size),
                maxSize: humanFileSize(maxSize),
              },
            ),
            { variant: "error" },
          );
        }
      });
    }

    if (acceptedFiles.length) {
      console.info("acceptedFiles", acceptedFiles);
      onChange(acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    ...rest,
  });

  if (disabled) {
    return (
      <div className={clsx(classes.placeholder, props.classes?.root)}>
        <CloudOff className={clsx(classes.icon, props.classes?.disabled)} />
      </div>
    );
  }

  return (
    <div {...getRootProps()} className={clsx(classes.placeholder, props.classes?.root)}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <CloudUploadOutlined className={clsx(classes.icon, props.classes?.active)} />
      ) : (
        <CloudUpload className={clsx(classes.icon, props.classes?.inactive)} />
      )}
    </div>
  );
};
