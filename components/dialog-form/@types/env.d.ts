declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STORYBOOK_ETHBERRY_LICENSE: string;
    }
  }
}

export {};
