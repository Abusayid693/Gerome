import {env} from 'process';

export const getAWSBucketLink = (file: string) => {
  return `https://${env.AWS_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${file}`;
};
