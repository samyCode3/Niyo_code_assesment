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
exports.AuthService = void 0;
const inversify_1 = require("inversify");
const repository_1 = require("../../data/repository/repository");
const token_1 = require("../../core/ioc/token");
const redis_config_1 = require("../../core/config/redis.config");
const functions_1 = require("../../core/utils/functions");
const http_status_codes_1 = require("http-status-codes");
const error_1 = require("../../core/module/internal/error/error");
const user_service_1 = require("../user/user.service");
const jwt_util_1 = require("../../core/module/jwt-util");
const bcyptjs_util_1 = require("../../core/module/bcyptjs-util");
let AuthService = class AuthService {
    constructor(cache, gen, repo, user) {
        this.cache = cache;
        this.gen = gen;
        this.repo = repo;
        this.user = user;
        this.db = this.repo.createBuilder("users");
    }
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db().select("*");
        });
    }
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, phone_number, username, password } = input;
            let emailUsers = yield this.user.getByEmail(email);
            if (emailUsers) {
                throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.CONFLICT, "Email has been used");
            }
            // Check if phone number exists
            let phoneUsers = yield this.user.getByPhone(phone_number);
            if (phoneUsers) {
                throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.CONFLICT, "Phone number has been used");
            }
            // Check if username exists
            let usernameUsers = yield this.user.getByUsername(username);
            if (usernameUsers) {
                throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.CONFLICT, "Username has been used");
            }
            let otp = yield this.gen.otpGen(4);
            let insertedUser = yield this.db()
                .insert(Object.assign({}, input))
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                const insertedId = result[0];
                let newUser = yield this.db()
                    .select("*")
                    .where("id", insertedId)
                    .first();
                let metadata = { id: newUser.id, otp };
                yield this.cache.setKey("user_registration", JSON.stringify({
                    metadata,
                    EX: 300,
                }));
                return newUser;
            }));
            return { insertedUser, otp };
        });
    }
    verifyOtp(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            const user_code = yield this.cache.getkey("user_registration");
            let token;
            let existing_user = JSON.parse(user_code);
            if (existing_user) {
                let id = existing_user.metadata.id;
                user = yield this.db().first("*").where({ id });
                if (user.email_verified == true) {
                    throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Email has already been verified");
                }
                if (existing_user.metadata.otp !== Number(input.code)) {
                    throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid otp");
                }
                else {
                    if (user) {
                        yield this.user.update({ email_verified: true }, user.id);
                    }
                }
            }
            else {
                throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.FORBIDDEN, "Unable to process this request");
            }
            let user_info = {
                id: user.id,
                phone_number: user.phone_number,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
            };
            return { user_info };
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, password } = data;
            let user = yield this.user.getByEmail(email);
            if (!user) {
                throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Email or password is not valid");
            }
            let isValid = yield (0, bcyptjs_util_1.verifyHashToken)(password, user.password);
            if (!isValid) {
                throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Email or password is not valid");
            }
            let user_info = {
                id: user.id,
                phone_number: user.phone_number,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
            };
            let token = (0, jwt_util_1.AccessToken)(user.id);
            //  console.log(token)
            return { user_info, token };
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(token_1.MODULE_TOKENS.redis)),
    __param(1, (0, inversify_1.inject)(token_1.GENERAL_FUNCTIONS.Gen)),
    __param(2, (0, inversify_1.inject)(token_1.MODULE_TOKENS.Repository)),
    __param(3, (0, inversify_1.inject)(token_1.SERVICE_MODULE.User_Service)),
    __metadata("design:paramtypes", [redis_config_1.RedisProperties,
        functions_1.GeneralFunctions,
        repository_1.Repository,
        user_service_1.UserService])
], AuthService);
