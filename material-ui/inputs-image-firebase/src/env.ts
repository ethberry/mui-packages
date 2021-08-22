// eslint-disable-next-line import/no-extraneous-dependencies
import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV}`,
  debug: process.env.DEBUG as any as boolean,
});

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test" | "staging";
      FIREBASE_API_KEY: string;
      FIREBASE_AUTH_DOMAIN: string;
      FIREBASE_DB_URL: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_STORAGE_BUCKET: string;
      FIREBASE_MESSAGE_SENDER_ID: string;
      FIREBASE_APP_ID: string;
      FIREBASE_MEASUREMENT_ID: string;
    }
  }
}
