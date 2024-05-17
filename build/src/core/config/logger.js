"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionLogger = exports.DevelopmentLogger = void 0;
const winston_1 = require("winston");
const { printf, combine, timestamp, colorize, json } = winston_1.format;
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
});
exports.DevelopmentLogger = (0, winston_1.createLogger)({
    level: 'debug',
    format: combine(json(), colorize(), timestamp({ format: "HH:mm:ss.SSS" }), myFormat),
    transports: [
        new winston_1.transports.Console()
    ]
});
exports.ProductionLogger = (0, winston_1.createLogger)({
    level: 'debug',
    format: combine(timestamp({ format: "HH:mm:ss.SSS" }), myFormat),
    transports: [
        new winston_1.transports.File({ filename: '../../logs/error.log', level: 'error' }),
        new winston_1.transports.File({ filename: '../../logs/info.log', level: 'info' }),
        new winston_1.transports.Console()
    ]
});
