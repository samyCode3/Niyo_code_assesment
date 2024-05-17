"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERAL_FUNCTIONS = exports.SERVICE_MODULE = exports.MODULE_TOKENS = void 0;
const MODULE_TOKENS = {
    KnexClient: "KnexClient",
    database: "database",
    Repository: "repository",
    redis: "redis_client",
    AUTHENTICATION: "authMiddleware"
};
exports.MODULE_TOKENS = MODULE_TOKENS;
const GENERAL_FUNCTIONS = {
    Gen: "Gen",
};
exports.GENERAL_FUNCTIONS = GENERAL_FUNCTIONS;
const SERVICE_MODULE = {
    Auth_Service: "Auth_Service",
    User_Service: "User_Service",
    Task_Manager: "task_manager"
};
exports.SERVICE_MODULE = SERVICE_MODULE;
