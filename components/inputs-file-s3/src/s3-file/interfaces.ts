export interface IUseS3UploaderProps {
  baseUrl?: string;
  signingUrl?: string;
  bucket?: string;
  onError?: (error: Error) => void;
  onFinish?: (result: IS3Response, file: File) => void;
}

export interface IUseS3UploaderReturnProps {
  files: File[];
}

export interface IS3Response {
  signedUrl: string;
}

export interface IS3SignDataRequest {
  objectName: string;
  contentType: string;
  bucket: string;
}
