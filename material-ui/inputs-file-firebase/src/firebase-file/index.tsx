import { FC } from "react";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import app from "@gemunion/firebase";

import { FileInput, IFileInputProps } from "@gemunion/mui-inputs-file";

export interface IFirebaseFileInputProps extends Omit<IFileInputProps, "onChange"> {
  bucket?: string;
  onChange: (urls: Array<string>) => void;
}

export const FirebaseFileInput: FC<IFirebaseFileInputProps> = props => {
  const { onChange, bucket, ...rest } = props;

  const handleChange = async (files: File[]): Promise<void> => {
    const storage = getStorage(app, bucket);
    const urls = await Promise.all(
      files.map(async file => {
        const storageRef = ref(storage, v4());
        const snapshot = await uploadBytes(storageRef, file);
        return getDownloadURL(snapshot.ref);
      }),
    );
    onChange(urls);
  };

  return <FileInput onChange={handleChange} {...rest} />;
};
