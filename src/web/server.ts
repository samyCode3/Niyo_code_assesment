import express, { NextFunction, Request, Response } from "express";
import { mySerever } from "./app";


let app = express()
let PORT = process.env.PORT || 3000;
export const  AppServer = () => {
    // mySerever()
    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        return res.send(`Hello Niyo Api`);
      });
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost${PORT}`);
      });
}

AppServer()