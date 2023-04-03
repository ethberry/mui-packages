import { lookup } from "mime-types";

import { useApiCall } from "@gemunion/react-hooks";

import { IS3Response, IUseS3UploaderProps, IUseS3UploaderReturnProps } from "./interfaces";

export const getFileMimeType = (file: File): string => {
  return file.type || (lookup(file.name) as string);
};

export const scrubFilename = (filename: string) => {
  return filename.replace(/[^\w_\-.]+/gi, "");
};

/* javascript-obfuscator:disable */
// prettier-ignore
const defaultBucket =
  process.env.AWS_S3_BUCKET ||
  process.env.STORYBOOK_AWS_S3_BUCKET ||
  process.env.REACT_APP_AWS_S3_BUCKET ||
  process.env.NEXT_PUBLIC_AWS_S3_BUCKET;
/* javascript-obfuscator:enable */

export const useS3Uploader = (props: IUseS3UploaderProps) => {
  const { onError = () => {}, onFinish = () => {}, signingUrl = "/s3/put", bucket = defaultBucket } = props;

  const { fn: getSignResultApi } = useApiCall(
    (api, data: any) =>
      api
        .fetchJson({
          url: signingUrl,
          data,
        })
        .then((json: IS3Response) => json?.signedUrl)
        .catch(error => {
          console.error("[sign error]", error);
          throw error;
        }),
    { success: false },
  );

  async function uploadFile(file: File, signedUrl: string): Promise<any> {
    const queryString = `&Content-Type=${encodeURIComponent(getFileMimeType(file))}`;

    return fetch(`${signedUrl}${queryString}`, {
      method: "PUT",
      body: file,
      mode: "cors",
      credentials: "include",
    });
  }

  return async (props: IUseS3UploaderReturnProps) => {
    const { files = [] } = props;

    async function getSignResult(file: File): Promise<string> {
      const fileName = scrubFilename(file.name);
      const data: any = {
        objectName: fileName,
        contentType: encodeURIComponent(getFileMimeType(file)),
        bucket,
      };

      const headers = new Headers();
      headers.set("Content-Type", getFileMimeType(file));

      const signedUrl = await getSignResultApi(undefined, data);

      return signedUrl || "";
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const signedUrl = await getSignResult(file);

        if (signedUrl) {
          const response = await uploadFile(file, signedUrl);
          onFinish(response, file);
          console.info("[successfully uploaded]", response);
        }
      }
    } catch (error: any) {
      console.error("[upload error]", error);
      onError(error);
    }
  };
};
