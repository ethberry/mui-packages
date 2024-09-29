import { FC, useCallback, useState } from "react";

import { FileInput, IFileInputProps } from "@ethberry/mui-inputs-file";

import type { IS3Response } from "./interfaces";
import { useS3Uploader } from "./use-s3-uploader";

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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadFilesToS3 = useS3Uploader({
    onFinish: (data: IS3Response) => {
      onChange(`${bucketUrl}${new URL(data.signedUrl).pathname}`);
      setIsLoading(false);
    },
    onError: (error: Error) => {
      setIsLoading(false);
      if (onError) {
        onError(error);
      } else {
        console.error(error);
      }
    },
  });

  const handleChange = useCallback(async (files: Array<File>): Promise<void> => {
    setIsLoading(true);

    const isValid = validate ? await validate(files) : true;

    if (!isValid) {
      console.error("Some of provided files are not valid", files);
      setIsLoading(false);
      return;
    }

    // eslint-disable-next-line no-new
    await uploadFilesToS3({ files });
  }, []);

  return <FileInput onChange={handleChange} isLoading={isLoading} {...rest} />;
};
