import express from 'express';
import d1Controller from '../controllers/d1/d1';

import { protect } from '../middlewares/auth';

const router = express.Router();

router.route('/create').post(protect, function (...args) {
  return d1Controller.create(...args);
});

router.route('/get/:customerId').post(protect, function (...args) {
  return d1Controller.get(...args);
});

router.route('/update/:id').post(protect, function (...args) {
  return d1Controller.update(...args);
});

router.route('/delete/:id').post(protect, function (...args) {
  return d1Controller.delete(...args);
});

export default router;
