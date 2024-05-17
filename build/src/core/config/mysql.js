"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Define the configuration object
const configuration = (0, knex_1.default)({
    client: "mysql",
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: Number(process.env.MYSQL_PORT)
    },
    migrations: {
        directory: "./database/migrations",
    },
});
const query = configuration.raw("SELECT 1+1 as result");
query
    .then((result) => {
    console.log("Database connection successful:");
})
    .catch((error) => {
    console.error(`Unable to connect to database` + error);
});
exports.default = configuration;
