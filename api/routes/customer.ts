import express from 'express';
import {
  addNewCustomer,
  deleteExistingCustomer,
  getCustomers,
  updateExistingCustomer
} from '../controllers/customer';
import {protect} from '../middlewares/auth';
const customerRouter = express.Router();

customerRouter.route('/all').post(protect, getCustomers);

customerRouter.route('/create').post(protect, addNewCustomer);

customerRouter.route('/update').put(protect, updateExistingCustomer);

customerRouter.route('/delete').delete(protect, deleteExistingCustomer);

export default customerRouter;
