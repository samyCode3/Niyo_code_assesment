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
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const di_container_1 = __importDefault(require("../core/config/di-container"));
const inversify_express_utils_1 = require("inversify-express-utils");
const morgan_1 = __importDefault(require("morgan"));
const global_error_1 = require("../core/middleware/global.error");
class App {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const server = new inversify_express_utils_1.InversifyExpressServer(di_container_1.default, null, {
                rootPath: "/api/v1",
            });
            server.setConfig((app) => {
                app.use(express_1.default.json());
                app.get("/", (request, response, next) => {
                    return response.send(`Hello Niyo Api`);
                });
                app.use((0, morgan_1.default)("dev"));
            });
            server.setErrorConfig((app) => {
                app.all("*", (request, response) => {
                    return response.status(404).json({ error: 404, message: "Route not found" });
                });
                app.use((0, global_error_1.globalErrorMiddleware)());
            });
            const app = server.build();
            app.listen(5000, () => console.log(`server running on http://localhost:5000`));
        });
    }
}
exports.App = App;
