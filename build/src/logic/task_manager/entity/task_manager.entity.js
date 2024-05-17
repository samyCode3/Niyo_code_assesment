"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = exports.BaseEntity = void 0;
const partial_instant_1 = __importDefault(require("../../../core/utils/partial-instant"));
class BaseEntity extends partial_instant_1.default {
}
exports.BaseEntity = BaseEntity;
class TaskManager extends BaseEntity {
}
exports.TaskManager = TaskManager;
