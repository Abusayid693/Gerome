"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { register, login, forgotPassword, resetPassword, removeUser, } = require("../controllers/auth");
const authRouter = express_1.default.Router();
authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/forgotPassword").post(forgotPassword);
authRouter.route("/resetpassword/:resetToken").post(resetPassword);
authRouter.route("/delete").delete(removeUser);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map