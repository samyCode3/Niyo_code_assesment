"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncFunction = (func) => {
    return (request, response, next) => {
        func(request, response, next).catch((err) => next(err));
    };
};
exports.default = asyncFunction;
