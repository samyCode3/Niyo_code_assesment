"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorMiddleware = void 0;
const error_1 = require("../module/internal/error/error");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
/**
 * Middleware for automatically interpreting `ApplicationError` and `APIError`. It responsds
 * with `INTERNAL_SERVER_ERROR` if the error is not one of either.
 * @param logger octonet logger
 */
function globalErrorMiddleware() {
    return function (err, req, res, next) {
        // handling for asynchronous situations where error is thrown after response has been sent
        if (res.headersSent)
            return next(err);
        if (err instanceof error_1.ApplicationError) {
            res.status(err.code).json({ message: err.message, data: err.data });
        }
        else {
            console.log(err);
            res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                message: 'We are having system level issues. Please bear with us',
            });
        }
    };
}
exports.globalErrorMiddleware = globalErrorMiddleware;
