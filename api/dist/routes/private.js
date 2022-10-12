"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { testPrivateRoute } = require('../controllers/private');
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.route('/').get(auth_1.protect, testPrivateRoute);
exports.default = router;
//# sourceMappingURL=private.js.map