import { FC, useCallback, useState } from "react";

import { IS3Response, S3Upload } from "@gemunion/s3-uploader";
import { useApi } from "@gemunion/provider-api";
import { FileInput, IFileInputProps } from "@gemunion/mui-inputs-file";

interface IS3FileInputProps extends Omit<IFileInputProps, "onChange" | "onError"> {
  bucketUrl?: string;
  bucket?: string;
  region?: string;
  onChange: (url: string) => void;
  onError?: (status: string) => void;
  onProgress?: (percent: number, status: string, file: File) => void;
  validate?: (files: File[]) => Promise<boolean>;
}

/* javascript-obfuscator:disable */
// prettier-ignore
const defaultBaseUrl =
  process.env.BE_URL ||
  process.env.STORYBOOK_BE_URL ||
  process.env.REACT_APP_BE_URL ||
  process.env.NEXT_PUBLIC_BE_URL;
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
    onError = console.error,
    onProgress = console.info,
    validate,
    ...rest
  } = props;

  const api = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    class MyS3Upload extends S3Upload {
      onFinishS3Put(data: IS3Response) {
        onChange(`${bucketUrl}${new URL(data.signedUrl).pathname}`);
        setIsLoading(false);
      }

      onProgress(percent: number, status: string, file: File) {
        onProgress(percent, status, file);
      }

      onError(error: string) {
        setIsLoading(false);
        onError(error);
      }
    }

    // eslint-disable-next-line no-new
    new MyS3Upload({
      files,
      signingUrl: "/s3/put",
      signingUrlMethod: "GET",
      withCredentials: true,
      server: defaultBaseUrl,
      signingUrlHeaders: {
        authorization: authToken ? `Bearer ${authToken.accessToken}` : "",
      },
      signingUrlQueryParams: {
        bucket,
      },
    });
  }, []);

  return <FileInput onChange={handleChange} isLoading={isLoading} {...rest} />;
};
