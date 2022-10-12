import express from 'express';
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  removeUser,
  getUserDetails,
  token
} = require('../controllers/auth');

import {protect} from '../middlewares/auth';

const authRouter = express.Router();

authRouter.route('/register').post(register);

authRouter.route('/login').post(login);

authRouter.route('/forgotPassword').post(forgotPassword);

authRouter.route('/resetpassword/:resetToken').post(resetPassword);

authRouter.route('/delete').delete(removeUser);

authRouter.route('/me').get(protect, getUserDetails);

authRouter.route('/token').get(token);

export default authRouter;
