import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import express from "express";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/error";

// Routers
import authRouter from "./routes/auth";
import customerRouter from "./routes/customer"
import privateRouter from "./routes/private"

const app = express();
connectDB();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/customer", customerRouter);
app.use("/api/private/test", privateRouter);


app.use(errorHandler)

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error : ${error}`);
  server.close(() => process.exit(1));
});

module.exports = server;