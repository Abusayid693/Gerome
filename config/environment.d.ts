declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      JWT_EXPIRE: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
      TEST_FROM_EMAIL: string;
      MAIL_USER: string;
      MAIL_PASS: string;
    }
  }
}
export {};
