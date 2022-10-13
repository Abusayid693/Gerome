declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      JWT_EXPIRE: string;
      REFRESH_TOKEN_SECRET: string;
      AWS_ID: string;
      AWS_SECRET: string;
      NODE_ENV: 'development' | 'production';
      AWS_BUCKET_NAME: string;
      PORT?: string;
      PWD: string;
      TEST_FROM_EMAIL: string;
      MAIL_USER: string;
      MAIL_PASS: string;
    }
  }
}
export {};
