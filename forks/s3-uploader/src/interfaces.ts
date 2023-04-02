export interface IUseS3UploaderProps {
  baseUrl?: string;
  signingUrl?: string;
  signingUrlQueryParams?: Record<string, string>;
  onError?: (error: Error) => void;
  onFinish?: (result: any, file: File) => void;
}

export interface IUseS3UploaderReturnProps {
  files: File[];
  signingUrlHeaders: Record<string, string>;
}

export interface IS3Response {
  signedUrl: string;
}
