import express from "express";
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require ("../controllers/auth");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").get(login);

router.route("/forgotPassword").post(forgotPassword);

router.route("/resetpassword/:resetToken").post(resetPassword);

module.exports = router;
