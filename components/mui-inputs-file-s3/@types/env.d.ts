declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_S3_BUCKET: string;
      AWS_REGION: string;

      STORYBOOK_AWS_S3_BUCKET: string;
      STORYBOOK_AWS_REGION: string;

      REACT_APP_AWS_S3_BUCKET: string;
      REACT_APP_AWS_REGION: string;

      NEXT_PUBLIC_AWS_S3_BUCKET: string;
      NEXT_PUBLIC_AWS_REGION: string;
    }
  }
}

export {};
