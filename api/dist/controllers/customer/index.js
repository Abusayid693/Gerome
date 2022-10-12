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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExistingCustomer = exports.addNewCustomer = void 0;
const Customers_1 = require("../../models/Customers");
const helpers = __importStar(require("./helpers"));
const addNewCustomer = async (req, res, next) => {
    const { name, phone, email, refUser } = req.body;
    const adminId = req.user._id;
    try {
        const customer = await Customers_1.Customers.create({
            adminId,
            name,
            phone,
            email,
            refUser
        });
        res.status(201).json({
            success: true,
            data: {
                customer: Object.assign({}, customer.toJSON())
            }
        });
    }
    catch (error) {
        if (helpers.checkIfCustomerExists(error)) {
            res.status(409).json({
                success: false,
                errors: [
                    {
                        field: 'name',
                        message: 'Customer already exists'
                    }
                ]
            });
        }
        next(error);
    }
};
exports.addNewCustomer = addNewCustomer;
const updateExistingCustomer = async (req, res, next) => {
    const { id, name, phone, email } = req.body;
    const adminId = req.user._id;
    if (!id) {
        res.status(409).json({
            success: false,
            errors: [
                {
                    field: 'id',
                    message: 'id is required'
                }
            ]
        });
    }
    try {
        const customer = await Customers_1.Customers.findOne({ adminId, _id: id });
        const isReferencedUserPresent = customer === null || customer === void 0 ? void 0 : customer.ifReferencedUserPresent();
        const refUser = isReferencedUserPresent
            ? await helpers.getReferencedUserByEmail(email)
            : null;
        await (customer === null || customer === void 0 ? void 0 : customer.update({
            name,
            phone,
            email,
            refUser
        }));
        const updatedCustomer = await Customers_1.Customers.findOne({ adminId, _id: id });
        res.status(200).json({
            success: true,
            data: {
                customer: Object.assign({}, updatedCustomer === null || updatedCustomer === void 0 ? void 0 : updatedCustomer.toJSON())
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateExistingCustomer = updateExistingCustomer;
//# sourceMappingURL=index.js.map