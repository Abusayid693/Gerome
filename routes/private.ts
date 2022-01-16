import express from "express";
const { testPrivateRoute } = require("../controllers/private");
import { protect } from "../middlewares/auth";

const router = express.Router();

router.route("/").get(protect, testPrivateRoute);

export default router;
