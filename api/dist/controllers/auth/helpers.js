"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.getToken = exports.checkIsUserExists = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const process_1 = require("process");
const checkIsUserExists = (error) => {
    return error.code === 11000 ? true : false;
};
exports.checkIsUserExists = checkIsUserExists;
const getToken = (user) => {
    const token = user.getSignedToken();
    return token;
};
exports.getToken = getToken;
const sendMail = async (mailBody) => {
    const trans = nodemailer_1.default.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: process_1.env.MAIL_USER,
            pass: process_1.env.MAIL_PASS
        }
    });
    const options = {
        from: process_1.env.TEST_FROM_EMAIL,
        to: mailBody.to,
        subject: mailBody.subject,
        html: mailBody.html
    };
    trans.sendMail(options, (err, info) => {
        if (err)
            console.log(err);
        else
            console.log(info);
    });
};
exports.sendMail = sendMail;
//# sourceMappingURL=helpers.js.map