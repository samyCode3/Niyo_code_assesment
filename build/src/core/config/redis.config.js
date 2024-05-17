"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.RedisProperties = void 0;
const inversify_1 = require("inversify");
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    url: process.env.REDIS_URL
});
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect().then((client) => __awaiter(void 0, void 0, void 0, function* () {
    let pingPong = yield client.PING();
    console.log(`connected redis client.... and return a message ${pingPong}`);
}));
let RedisProperties = class RedisProperties {
    setKey(keys, property) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = client.set(keys, property);
            return key;
        });
    }
    getkey(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = client.get(keys);
            return key;
        });
    }
};
exports.RedisProperties = RedisProperties;
exports.RedisProperties = RedisProperties = __decorate([
    (0, inversify_1.injectable)()
], RedisProperties);
exports.default = client;
