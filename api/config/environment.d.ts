declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      JWT_EXPIRE: string;
      JWT_REFRESH_EXPIRE: string;
      JWT_REFRESH_SECRET: string;
      JWT_ISSUER: string;
      JWT_AUDIANCE: string;
      JWT_REFRESH_TYPE: string;
      JWT_ACCESS_TYPE: string;

      AWS_ID: string;
      AWS_SECRET: string;
      NODE_ENV: 'development' | 'production';
      AWS_BUCKET_NAME: string;
      PORT?: string;
      PWD: string;
      TEST_FROM_EMAIL: string;
      SENTRY_DSN: string;
      MAIL_USER: string;
      MAIL_PASS: string;
    }
  }
}
export {};
