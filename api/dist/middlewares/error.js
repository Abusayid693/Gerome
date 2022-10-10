"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorResponse_1 = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    console.log("Error : ", err);
    error.message = err.message;
    if (err.code === 11000) {
        const message = "Duplicate Field value error";
        error = new errorResponse_1.ErrorResponse(message, 400);
    }
    if (err.name === "validationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new errorResponse_1.ErrorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        errors: [
            {
                field: "none",
                message: error.message || "Server error",
            },
        ],
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map