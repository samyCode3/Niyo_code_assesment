"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../config/logger");
let logger;
if (process.env.NODE_Env === "development") {
    logger = logger_1.DevelopmentLogger;
}
if (process.env.NODE_Env === "prod") {
    logger = logger_1.ProductionLogger;
}
console.log(process.env.NODE_Env);
exports.default = logger;
