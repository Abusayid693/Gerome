"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const User_1 = require("../models/User");
const errorResponse_1 = require("../utils/errorResponse");
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new errorResponse_1.ErrorResponse('Unauthorized request', 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process_1.env.JWT_SECRET);
        const user = await User_1.User.findById(decoded === null || decoded === void 0 ? void 0 : decoded.id);
        if (!user) {
            return next(new errorResponse_1.ErrorResponse('User not found', 404));
        }
        req.user = user;
        next();
    }
    catch (error) {
        return next(new errorResponse_1.ErrorResponse('Unauthorized request', 401));
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map