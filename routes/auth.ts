import express from "express";
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  removeUser 
} = require ("../controllers/auth"); 

const authRouter = express.Router();

authRouter.route("/register").post(register);

authRouter.route("/login").post(login);

authRouter.route("/forgotPassword").post(forgotPassword);

authRouter.route("/resetpassword/:resetToken").post(resetPassword);

authRouter.route("/delete").delete(removeUser);
 
export default authRouter;
