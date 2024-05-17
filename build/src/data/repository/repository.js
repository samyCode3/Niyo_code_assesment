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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const inversify_1 = require("inversify");
const token_1 = require("../../core/ioc/token");
const ulid_1 = require("ulid");
let Repository = class Repository {
    constructor(kx) {
        this.kx = kx;
    }
    id() {
        return (0, ulid_1.ulid)();
    }
    /**
     * creates a knex query object for a specified table
     * @param table table name
     * @param excluded fields which should be excluded from the query result to be returned
     * @returns
     */
    queryBuilder(table, excluded) {
        return this.kx(table).queryContext({ excluded });
    }
    raw(sql, bindings) {
        return this.kx.raw(sql, bindings);
    }
    createBuilder(table, excluded) {
        return () => this.queryBuilder(table, excluded);
    }
};
exports.Repository = Repository;
exports.Repository = Repository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(token_1.MODULE_TOKENS.KnexClient)),
    __metadata("design:paramtypes", [Object])
], Repository);
