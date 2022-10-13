import crypto from 'crypto';
import {NextFunction, Request, Response} from 'express';
import {env} from 'process';
import {s3} from '../../config/aws';
import * as helpers from './helper';

export interface IFile {
  name: String;
  data: Buffer;
  size: Number;
  encoding: String;
  tempFilePath: String;
  truncated: Boolean;
  mimetype: String;
  md5: String;
}

export const S3UploadFile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.files) {
    const image = req.files.file as IFile;

    const imageType = image.mimetype.split('/')[1];
    const randomBytes = crypto.randomBytes(64).toString('hex');
    const key = `${randomBytes}.${imageType}`;

    const params = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
      Body: image.data
    };

    s3.upload(params, (error: any, data: any) => {
      if (error) {
        return next(error);
      }
      res.status(201).json({
        success: true,
        data: {
          url: helpers.getAWSBucketLink(key),
          bucket: env.AWS_BUCKET_NAME
        }
      });
    });
  } else {
    res.status(409).json({
      success: false,
      data: [
        {
          field: 'file',
          message: 'File not found'
        }
      ]
    });
  }
};
