declare module "@gemunion/s3-uploader" {
  export interface S3Response {
    signedUrl: string;
    publicUrl: string;
    filename: string;
    fileKey: string;
  }

  export interface S3UploadOptions {
    signingUrl?: string;
    signingUrlMethod?: "GET" | "POST";
    getSignedUrl?: (file: File, callback: (params: S3Response) => void) => void;
    s3path?: string;
    preprocess?: (file: File, next: (file: File) => void) => void;
    onSignedUrl?: (response: S3Response) => void;
    onProgress?: (percent: number, status: string, file: File) => void;
    onError?: (message: string) => void;
    signingUrlHeaders?: Record<string, unknown>;
    signingUrlQueryParams?: Record<string, unknown>;
    signingUrlWithCredentials?: boolean;
    uploadRequestHeaders?: object;
    contentDisposition?: string;
    server?: string;
    fileElement?: HTMLInputElement | null;
    files?: HTMLInputElement["files"] | null;
    onFinishS3Put?: ReactS3UploaderProps["onFinish"];
    successResponses?: number[];
    scrubFilename?: (filename: string) => string;
  }

  class S3Upload {
    constructor(options: ReactS3UploaderProps);

    abortUpload(): void;

    uploadFile(file: File): Promise<S3Response>;

    uploadToS3(file: File, signResult: S3Response): void;
  }
}
