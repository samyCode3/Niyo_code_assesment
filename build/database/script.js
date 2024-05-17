"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const fs_1 = __importDefault(require("fs"));
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class Connection {
    constructor() {
        this.db = mysql_1.default.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_ROOT_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            port: Number(process.env.MYSQL_PORT)
        });
    }
    connect() {
        const connection = new Connection();
        connection.db.connect((err) => {
            if (err) {
                console.error("Error connecting to MySQL:", err);
                return;
            }
            console.log("Connected to MySQL successfully");
        });
        return connection.db;
    }
    runLatestMigration() {
        return __awaiter(this, void 0, void 0, function* () {
            const migrationFiles = fs_1.default.readdirSync('./database/migrations').sort();
            for (const fileName of migrationFiles) {
                const migrationSql = fs_1.default.readFileSync(`./database/migrations/${fileName}`, 'utf8');
                try {
                    yield this.queryAsync(migrationSql);
                    console.log(`Migration ${fileName} executed successfully.`);
                }
                catch (error) {
                    console.error(`Error executing migration ${fileName}: ${error}`);
                }
            }
        });
    }
    queryAsync(sql) {
        return new Promise((resolve, reject) => {
            this.db.query(sql, (error, results) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    }
}
exports.Connection = Connection;
const connectDb = new Connection();
connectDb.runLatestMigration();
connectDb.connect();
