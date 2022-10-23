import AWS from 'aws-sdk';
import {env} from 'process';

export const s3 = new AWS.S3({
  credentials: {
    accessKeyId: env.AWS_ID,
    secretAccessKey: env.AWS_SECRET
  }
});

export const Ses = new AWS.SES({
  credentials: {
    accessKeyId: env.AWS_ID,
    secretAccessKey: env.AWS_SECRET
  },
  region: 'ap-south-1'
});
