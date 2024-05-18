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
exports.UserService = void 0;
const token_1 = require("../../core/ioc/token");
const inversify_1 = require("inversify");
const repository_1 = require("../../data/repository/repository");
let UserService = class UserService {
    constructor(repo) {
        this.repo = repo;
        this.db = this.repo.createBuilder("users");
    }
    userById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db().where({ id }).first("*");
            return user;
        });
    }
    getByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db().where({ username }).first("*");
            return user;
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db().where({ email }).first("*");
            return user;
        });
    }
    getByPhone(phone_number) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db().where({ phone_number }).first("*");
            return user;
        });
    }
    update(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db()
                .update(Object.assign({}, data))
                .where({ id });
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(token_1.MODULE_TOKENS.Repository)),
    __metadata("design:paramtypes", [repository_1.Repository])
], UserService);
