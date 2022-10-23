import express from 'express';
import d2Controller from '../controllers/d1/d2';

import {protect} from '../middlewares/auth';

const router = express.Router();

router.route('/create').post(protect, function (...args) {
  return d2Controller.create(...args);
});

router.route('/get/:customerId').post(protect, function (...args) {
  return d2Controller.get(...args);
});

router.route('/update/:id').post(protect, function (...args) {
  return d2Controller.update(...args);
});

router.route('/delete/:id').post(protect, function (...args) {
  return d2Controller.delete(...args);
});

export default router;
