import express from 'express';
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  removeUser,
  getUserDetails,
  token,
  getUserByEmail,
  getUserByUsername
} = require('../controllers/auth');

import {protect} from '../middlewares/auth';

const authRouter = express.Router();

authRouter.route('/register').post(register);

authRouter.route('/login').post(login);

authRouter.route('/forgotPassword').post(forgotPassword);

authRouter.route('/resetpassword/:resetToken').post(resetPassword);

authRouter.route('/token').get(token);

authRouter.route('/delete').delete(protect, removeUser);

authRouter.route('/me').get(protect, getUserDetails);

authRouter.route('/getUserByEmail/:email').post(protect, getUserByEmail);

authRouter.route('/getUserByUsername/:username').post(protect, getUserByUsername);

export default authRouter;
