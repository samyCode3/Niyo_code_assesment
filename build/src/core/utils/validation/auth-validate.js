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
exports.validateUpdate = exports.validateLoginField = exports.validateOtpField = exports.validateRegisterField = void 0;
const joi_1 = __importDefault(require("joi"));
const validator_1 = __importDefault(require("../validator"));
const validateRegisterField = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object().keys({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        username: joi_1.default.string().required().trim(),
        email: joi_1.default.string().email().required().trim(),
        phone_number: joi_1.default.string().required(),
        password: joi_1.default.string().min(8).max(10000).required(),
    });
    return (0, validator_1.default)(schema, body);
});
exports.validateRegisterField = validateRegisterField;
const validateOtpField = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object().keys({
        code: joi_1.default.string().required(),
    });
    return (0, validator_1.default)(schema, body);
});
exports.validateOtpField = validateOtpField;
const validateLoginField = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required()
    });
    return (0, validator_1.default)(schema, body);
});
exports.validateLoginField = validateLoginField;
const validateUpdate = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object().keys({
        firstName: joi_1.default.string(),
        lastName: joi_1.default.string(),
        username: joi_1.default.string().trim(),
    });
    return (0, validator_1.default)(schema, body);
});
exports.validateUpdate = validateUpdate;
