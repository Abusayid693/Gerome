import express from "express";
import {addNewCustomer, updateExistingCustomer} from "../controllers/customer"

const customerRouter = express.Router();

customerRouter.route("/create").post(addNewCustomer);
customerRouter.route("/update").post(updateExistingCustomer);

export default customerRouter