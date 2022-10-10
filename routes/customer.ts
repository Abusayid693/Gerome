import express from "express";
import { addNewCustomer, updateExistingCustomer } from "../controllers/customer";
import { protect } from "../middlewares/auth";
const customerRouter = express.Router();

customerRouter.route("/create").post(protect, addNewCustomer);
customerRouter.route("/update").put(protect, updateExistingCustomer);

export default customerRouter