import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth.ts"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});
