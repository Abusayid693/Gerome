import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});
