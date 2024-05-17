"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMiddleware = void 0;
class BaseMiddleware {
    constructor() {
        this.execute = this.execute.bind(this);
    }
}
exports.BaseMiddleware = BaseMiddleware;
