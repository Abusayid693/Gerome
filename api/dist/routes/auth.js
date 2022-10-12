"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { register, login, forgotPassword, resetPassword, removeUser, getUserDetails, token } = require('../controllers/auth');
const auth_1 = require("../middlewares/auth");
const authRouter = express_1.default.Router();
authRouter.route('/register').post(register);
authRouter.route('/login').post(login);
authRouter.route('/forgotPassword').post(forgotPassword);
authRouter.route('/resetpassword/:resetToken').post(resetPassword);
authRouter.route('/delete').delete(removeUser);
authRouter.route('/me').get(auth_1.protect, getUserDetails);
authRouter.route('/token').get(token);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map