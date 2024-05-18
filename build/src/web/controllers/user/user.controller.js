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
exports.UserController = void 0;
const token_1 = require("../../../core/ioc/token");
const auth_middleware_1 = require("../../../core/middleware/auth.middleware");
const auth_validate_1 = require("../../../core/utils/validation/auth-validate");
const user_service_1 = require("../../../logic/user/user.service");
const http_status_codes_1 = require("http-status-codes");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
let UserController = class UserController {
    constructor(user) {
        this.user = user;
    }
    getUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const claim = req.user;
            const user = yield this.user.userById(claim.id);
            return user;
        });
    }
    updateuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const claim = req.user;
            const update = req.body;
            const update_user = yield (0, auth_validate_1.validateUpdate)(update);
            yield this.user.update(update_user, claim.id);
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Update was successfull" });
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, inversify_express_utils_1.httpGet)('/', auth_middleware_1.deserializeUser),
    __param(0, (0, inversify_express_utils_1.request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)('/update-user', auth_middleware_1.deserializeUser),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateuser", null);
exports.UserController = UserController = __decorate([
    (0, inversify_express_utils_1.controller)('/user'),
    __param(0, (0, inversify_1.inject)(token_1.SERVICE_MODULE.User_Service)),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
