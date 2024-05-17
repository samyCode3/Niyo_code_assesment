"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_express_utils_1 = require("inversify-express-utils");
const auth_service_1 = require("../../../logic/auth/auth.service");
const inversify_1 = require("inversify");
const token_1 = require("../../../core/ioc/token");
const auth_validate_1 = require("../../../core/utils/validation/auth-validate");
const bcyptjs_util_1 = require("../../../core/module/bcyptjs-util");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user_input = yield (0, auth_validate_1.validateRegisterField)(req.body);
            user_input.password = (0, bcyptjs_util_1.hashing)(user_input.password);
            return yield this.service.createUser(user_input);
        });
    }
    verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let input = yield (0, auth_validate_1.validateOtpField)(req.body);
            return yield this.service.verifyOtp(input);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let input = yield (0, auth_validate_1.validateLoginField)(req.body);
            return yield this.service.login(input);
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpPost)("/register"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createUser", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/verify"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyUser", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/login'),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, inversify_express_utils_1.controller)("/auth"),
    __param(0, (0, inversify_1.inject)(token_1.SERVICE_MODULE.Auth_Service)),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.default = AuthController;
