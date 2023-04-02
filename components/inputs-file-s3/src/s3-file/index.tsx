import { FC, useCallback, useState } from "react";

import { useS3Uploader, IS3Response } from "@gemunion/s3-uploader";
import { useApi } from "@gemunion/provider-api";
import { FileInput, IFileInputProps } from "@gemunion/mui-inputs-file";

interface IS3FileInputProps extends Omit<IFileInputProps, "onChange"> {
  bucketUrl?: string;
  bucket?: string;
  region?: string;
  onChange: (url: string) => void;
  onError?: (err: Error) => void;
  validate?: (files: File[]) => Promise<boolean>;
}

/* javascript-obfuscator:disable */
// prettier-ignore
const defaultBucket =
  process.env.AWS_S3_BUCKET ||
  process.env.STORYBOOK_AWS_S3_BUCKET ||
  process.env.REACT_APP_AWS_S3_BUCKET ||
  process.env.NEXT_PUBLIC_AWS_S3_BUCKET;
const defaultRegion =
  process.env.AWS_REGION ||
  process.env.STORYBOOK_AWS_REGION ||
  process.env.REACT_APP_AWS_REGION ||
  process.env.NEXT_PUBLIC_AWS_REGION;
/* javascript-obfuscator:enable */

export const S3FileInput: FC<IS3FileInputProps> = props => {
  const {
    bucket = defaultBucket,
    region = defaultRegion,
    bucketUrl = `https://${bucket}.s3.${region}.amazonaws.com`,
    onChange,
    onError,
    validate,
    ...rest
  } = props;

  const api = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadFilesToS3 = useS3Uploader({
    onFinish: (data: IS3Response) => {
      onChange(`${bucketUrl}${new URL(data.signedUrl).pathname}`);
      setIsLoading(false);
    },
    onError: (error: Error) => {
      setIsLoading(false);
      onError ? onError(error) : console.error(error);
    },
  });

  const handleChange = useCallback(async (files: Array<File>): Promise<void> => {
    setIsLoading(true);

    if (api.isAccessTokenExpired()) {
      await api.refreshToken();
    }

    const authToken = api.getToken();

    const isValid = validate ? await validate(files) : true;

    if (!isValid) {
      console.error("Some of provided files are not valid", files);
      setIsLoading(false);
      return;
    }

    // eslint-disable-next-line no-new
    await uploadFilesToS3({
      files,
      signingUrlHeaders: {
        authorization: authToken ? `Bearer ${authToken.accessToken}` : "",
      },
    });
  }, []);

  return <FileInput onChange={handleChange} isLoading={isLoading} {...rest} />;
};
