"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMarkAsCompleted = exports.validateUpdateTaskField = exports.validateParamsId = exports.validateTaskField = void 0;
const joi_1 = __importDefault(require("joi"));
const validator_1 = __importDefault(require("../validator"));
const validateTaskField = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object().keys({
        task_name: joi_1.default.string().required().min(4).max(20),
        task_description: joi_1.default.string().required(),
        priority: joi_1.default.string().required().valid('Normal', 'High'),
        start_date: joi_1.default.string().required(),
        end_date: joi_1.default.string().required(),
    });
    return (0, validator_1.default)(schema, body);
});
exports.validateTaskField = validateTaskField;
const validateParamsId = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object().keys({
        id: joi_1.default.string().required()
    });
    return (0, validator_1.default)(schema, body);
});
exports.validateParamsId = validateParamsId;
const validateUpdateTaskField = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object().keys({
        id: joi_1.default.string().required().id(),
        task_name: joi_1.default.string().min(4).max(20),
        task_description: joi_1.default.string(),
        priority: joi_1.default.string().valid('Normal', 'High'),
        start_date: joi_1.default.string(),
        end_date: joi_1.default.string(),
        status: joi_1.default.string().valid('Almost done', 'Completed', 'Pending')
    });
    return (0, validator_1.default)(schema, body);
});
exports.validateUpdateTaskField = validateUpdateTaskField;
const validateMarkAsCompleted = (body) => {
    const schema = joi_1.default.object().keys({
        status: joi_1.default.string().valid('Almost done', 'Completed', 'Pending').required()
    });
    return (0, validator_1.default)(schema, body);
};
exports.validateMarkAsCompleted = validateMarkAsCompleted;
