import express from 'express';
import {S3UploadFile} from '../controllers/s3';
const router = express.Router();

router.route('/image').post(S3UploadFile);

export default router;
