import express from 'express';
import {create} from '../controllers/d1';

import {protect} from '../middlewares/auth';

const router = express.Router();

router.route('/create').post(protect, create);

export default router;
