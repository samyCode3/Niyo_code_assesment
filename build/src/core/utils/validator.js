"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const error_1 = require("../module/internal/error/error");
exports.default = (schema, body) => {
    const { error, value } = schema.validate(body, { abortEarly: true });
    console.log({ error });
    if (error) {
        throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.BAD_REQUEST, error.details[0].message);
    }
    return value;
};
