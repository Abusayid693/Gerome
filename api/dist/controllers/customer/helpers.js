"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReferencedUserByEmail = exports.checkIfCustomerExists = void 0;
const User_1 = require("../../models/User");
const checkIfCustomerExists = (error) => {
    return error.code === 11000 ? true : false;
};
exports.checkIfCustomerExists = checkIfCustomerExists;
const getReferencedUserByEmail = async (email) => {
    try {
        const user = await User_1.User.findOne({ email });
        return user ? user._id : null;
    }
    catch (error) {
        return null;
    }
};
exports.getReferencedUserByEmail = getReferencedUserByEmail;
//# sourceMappingURL=helpers.js.map