"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const Customers_1 = require("../../models/Customers");
const User_1 = require("../../models/User");
const errorResponse_1 = require("../../utils/errorResponse");
const helpers = __importStar(require("./helpers"));
exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        await User_1.User.create({
            username,
            email,
            password,
        });
        res.status(200).json({
            success: true,
            data: "User successfully registered",
        });
    }
    catch (error) {
        if (helpers.checkIsUserExists(error)) {
            res.status(409).json({
                success: false,
                errors: [
                    {
                        field: "email",
                        message: "Email already exists",
                    },
                ],
            });
        }
        next(error);
    }
};
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorResponse_1.ErrorResponse("Required fields not provided", 400));
    }
    try {
        const user = await User_1.User.findOne({ email }).select("+password");
        if (!user) {
            return next(new errorResponse_1.ErrorResponse("User not found", 404));
        }
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return next(new errorResponse_1.ErrorResponse("Wrong password", 401));
        }
        res.status(200).json({
            success: true,
            data: {
                token: helpers.getToken(user),
                user: Object.assign({}, user.toJSON()),
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return next(new errorResponse_1.ErrorResponse("This email is not registered", 401));
        }
        const resetToken = await user.getResetToken();
        await user.save();
        const resetUrl = `http://localhost:300/reset/${resetToken}`;
        const message = `
    <h1> Reset your password now using this link : </h1>
    <a href=${resetUrl} target="_blank">${resetUrl}</a>
    `;
        try {
            await helpers.sendMail({
                to: email,
                subject: "Reset your password",
                html: message,
            });
            res.status(200).json({
                success: true,
                data: "Reset mail sent",
            });
        }
        catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(new errorResponse_1.ErrorResponse("Email sending error", 500));
        }
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto_1.default
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");
    try {
        const user = await User_1.User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        if (!user) {
            return next(new errorResponse_1.ErrorResponse("Reset token invalid", 400));
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.save();
        return res.status(200).json({
            success: true,
            data: "Password reset success",
        });
    }
    catch (error) {
        next(error);
    }
    res.send("Reset password route");
};
exports.removeUser = async (req, res, next) => {
    const { id } = req.body;
    if (!id) {
        res.status(403).json({
            success: false,
            errors: [
                {
                    field: "id",
                    message: "id is required",
                },
            ],
        });
    }
    try {
        const user = await User_1.User.findById(id);
        if (!(user === null || user === void 0 ? void 0 : user._id)) {
            res.status(400).json({
                success: true,
                errors: [
                    {
                        field: "id",
                        message: "Invalid user",
                    },
                ],
            });
        }
        await Customers_1.Customers.deleteMany({ adminId: user === null || user === void 0 ? void 0 : user._id });
        await (user === null || user === void 0 ? void 0 : user.remove());
        res.status(200).json({
            success: true,
            data: "User successfully deleted",
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=index.js.map