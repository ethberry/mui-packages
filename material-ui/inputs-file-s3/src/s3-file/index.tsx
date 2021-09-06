import { FC, useCallback, useContext } from "react";
import "react-s3-uploader"; // this is required for types
import S3Upload from "react-s3-uploader/s3upload";
import { ApiContext, IApiContext, IJwt } from "@gemunion/provider-api";

import { FileInput, IFileInputProps } from "@gemunion/material-ui-inputs-file";

export interface IS3Result {
  signedUrl: string;
}

interface IS3FileInputProps extends Omit<IFileInputProps, "onChange"> {
  baseUrl?: string;
  bucket?: string;
  onChange: (url: string) => void;
  onError?: (message: string) => void;
  onProgress?: (percent: number, status: string, file: File) => void;
  validate?: (files: File[]) => Promise<boolean>;
}

export const S3FileInput: FC<IS3FileInputProps> = props => {
  const { bucket = process.env.AWS_S3_BUCKET, onChange, onError, onProgress, validate, ...rest } = props;

  const { baseUrl = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com` } = props;

  const api = useContext<IApiContext<IJwt>>(ApiContext);

  const handleChange = useCallback(async (files: Array<File>): Promise<void> => {
    // @ts-ignore
    const authToken = api.getToken().accessToken;

    const isValid = validate ? await validate(files) : true;

    if (!isValid) {
      console.error("Provided file is not valid", files);
      return;
    }

    // eslint-disable-next-line no-new
    new S3Upload({
      files,
      signingUrl: "/s3/put",
      onFinishS3Put: (data: IS3Result) => {
        onChange(`${baseUrl}${new URL(data.signedUrl).pathname}`);
      },
      onProgress: onProgress || (() => {}),
      onError: onError || (() => {}),
      signingUrlMethod: "GET",
      signingUrlWithCredentials: true,
      server: process.env.BE_URL,
      signingUrlHeaders: {
        // @ts-ignore
        authorization: authToken ? `Bearer ${authToken}` : "",
      },
      signingUrlQueryParams: {
        // @ts-ignore
        bucket,
      },
    });
  }, []);

  return <FileInput onChange={handleChange} {...rest} />;
};
