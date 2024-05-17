"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = exports.AccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AccessToken = (id) => {
    const access = jsonwebtoken_1.default.sign({ id }, process.env.SECRET_TOKEN, {
        expiresIn: '1d'
    });
    return access;
};
exports.AccessToken = AccessToken;
const VerifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.VerifyToken = VerifyToken;
