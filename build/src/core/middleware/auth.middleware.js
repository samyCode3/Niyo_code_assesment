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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeUser = void 0;
const jwt_util_1 = require("../module/jwt-util");
const secret = process.env.JWT_SECRET;
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: "UNAUTHORIZED" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "UNAUTHORIZED" });
        }
        let user = (0, jwt_util_1.VerifyToken)(token, process.env.SECRET_TOKEN);
        req.user = user;
        next();
    }
    catch (error) {
        if (error.message == "jwt expired") {
            return res.status(401).json({ message: "UNAUTHORIZED" });
        }
        else {
            return res.status(401).json({ message: "UNAUTHORIZED" });
        }
    }
});
exports.deserializeUser = deserializeUser;
