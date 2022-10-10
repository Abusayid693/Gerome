import express from "express";
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require ("../controllers/auth"); 

const authRouter = express.Router();

authRouter.route("/register").post(register);

authRouter.route("/login").post(login);

authRouter.route("/forgotPassword").post(forgotPassword);

authRouter.route("/resetpassword/:resetToken").post(resetPassword);

export default authRouter;
