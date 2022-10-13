"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = require("../controllers/customer");
const auth_1 = require("../middlewares/auth");
const customerRouter = express_1.default.Router();
customerRouter.route('/all').post(auth_1.protect, customer_1.getCustomers);
customerRouter.route('/create').post(auth_1.protect, customer_1.addNewCustomer);
customerRouter.route('/update').put(auth_1.protect, customer_1.updateExistingCustomer);
customerRouter.route('/delete').delete(auth_1.protect, customer_1.deleteExistingCustomer);
exports.default = customerRouter;
//# sourceMappingURL=customer.js.map