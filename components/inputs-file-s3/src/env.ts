declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BE_URL: string;
      AWS_S3_BUCKET: string;
      AWS_REGION: string;
    }
  }
}

export {};
