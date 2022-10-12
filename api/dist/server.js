"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config.env' });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const error_1 = require("./middlewares/error");
const auth_1 = __importDefault(require("./routes/auth"));
const customer_1 = __importDefault(require("./routes/customer"));
const private_1 = __importDefault(require("./routes/private"));
const app = (0, express_1.default)();
(0, db_1.connectDB)();
app.use(express_1.default.json());
app.use('/api/auth', auth_1.default);
app.use('/api/customer', customer_1.default);
app.use('/api/private/test', private_1.default);
app.use(error_1.errorHandler);
const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});
process.on('unhandledRejection', (error, promise) => {
    console.log(`Logged Error : ${error}`);
    server.close(() => process.exit(1));
});
module.exports = server;
//# sourceMappingURL=server.js.map