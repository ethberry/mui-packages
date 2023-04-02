import { lookup } from "mime-types";

import { IS3Response, IUseS3UploaderProps, IUseS3UploaderReturnProps } from "./interfaces";

export const getFileMimeType = (file: File): string => {
  return file.type || (lookup(file.name) as string);
};

export const scrubFilename = (filename: string) => {
  return filename.replace(/[^\w_\-.]+/gi, "");
};

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
/* javascript-obfuscator:enable */

export const useS3Uploader = (props: IUseS3UploaderProps) => {
  const {
    baseUrl = defaultBaseUrl,
    onError = () => {},
    onFinish = () => {},
    signingUrl = "/s3/put",
    signingUrlQueryParams = { bucket: defaultBucket },
  } = props;

  async function uploadFile(file: File, signResult: Response): Promise<any> {
    const headers = new Headers(signResult.headers);

    headers.set("x-amz-acl", "public-read");
    headers.set("Content-Type", getFileMimeType(file));

    const { signedUrl }: IS3Response = await signResult.json();

    const queryString = `&Content-Type=${encodeURIComponent(getFileMimeType(file))}`;

    return fetch(`${signedUrl}${queryString}`, {
      method: "PUT",
      body: file,
      headers,
      mode: "cors",
      credentials: "include",
    });
  }

  return async (props: IUseS3UploaderReturnProps) => {
    const { files = [], signingUrlHeaders } = props;

    async function getSignResult(file: File): Promise<Response> {
      const fileName = scrubFilename(file.name);
      let queryString = `?objectName=${fileName}&contentType=${encodeURIComponent(getFileMimeType(file))}`;

      const headers = new Headers();

      headers.set("Content-Type", getFileMimeType(file));

      Object.keys(signingUrlHeaders).forEach(key => {
        headers.set(key, signingUrlHeaders[key]);
      });

      Object.keys(signingUrlQueryParams).forEach(key => {
        queryString += `&${key}=${signingUrlQueryParams[key]}`;
      });

      const url = `${baseUrl}${signingUrl}${queryString}`;

      return fetch(url, {
        method: "GET",
        headers,
        mode: "cors",
        credentials: "include",
      }).catch(error => {
        console.error("[sign error]", error);
        throw error;
      });
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const signResult = await getSignResult(file);
        const response = await uploadFile(file, signResult);
        onFinish(response, file);
        console.info("[successfully uploaded]", response);
      }
    } catch (error: any) {
      console.error("[upload error]", error);
      onError(error);
    }
  };
};
