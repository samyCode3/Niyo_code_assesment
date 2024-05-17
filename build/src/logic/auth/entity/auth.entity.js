"use strict";
// phone_number VARCHAR(50) NOT NULL,
// email VARCHAR(50) UNIQUE,
// username VARCHAR(50),
// phone_number_verified BOOLEAN NOT NULL DEFAULT false,
// email_verified BOOLEAN NOT NULL DEFAULT false,
// mfa_id VARCHAR(50),
// password VARCHAR(50),
// createdAt DATE,
// updatedAt DATE
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.BaseEntity = void 0;
const partial_instant_1 = __importDefault(require("../../../core/utils/partial-instant"));
class BaseEntity extends partial_instant_1.default {
}
exports.BaseEntity = BaseEntity;
class User extends BaseEntity {
}
exports.User = User;
