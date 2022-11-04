import { FC, useState } from "react";

import { FileInput, IFileInputProps } from "@gemunion/mui-inputs-file";

import { useUploadUrl } from "./utils";

export interface IFirebaseFileInputProps extends Omit<IFileInputProps, "onChange"> {
  bucket?: string;
  onChange: (urls: Array<string>) => void;
}

export const FirebaseFileInput: FC<IFirebaseFileInputProps> = props => {
  const { onChange, bucket, ...rest } = props;

  const uploadUrl = useUploadUrl(bucket);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpload = async (files: Array<File>) => {
    setIsLoading(true);
    const result = await uploadUrl(files);
    setIsLoading(false);

    return result;
  };

  const handleChange = async (files: Array<File>): Promise<void> => {
    onChange(await handleUpload(files));
  };

  return <FileInput onChange={handleChange} isLoading={isLoading} {...rest} />;
};
