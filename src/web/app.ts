import "reflect-metadata";
import "../core/config/redis.config";
import "../core/config/redis.config";

import express, { NextFunction, Request, Response } from "express";
import container from "../core/config/di-container";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";
import { globalErrorMiddleware } from "../core/middleware/global.error";

let PORT = process.env.PORT || 3000;
export const mySerever = () => {

  const server = new InversifyExpressServer(container, null, {
    rootPath: "/api/v1",
  });
  
  server.setConfig((app) => {
    app.use(express.json());
    app.get("/", (req: Request, res: Response, next: NextFunction) => {
      return res.send(`Hello Niyo Api`);
    });
    app.use(morgan("dev"));

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost${PORT}`);
    });
  });

  server.setErrorConfig((app) => {
    app.all("*", (req: Request, res: Response) => {
      return res.status(404).json({ error: 404, message: "Route not found" });
    });
    app.use(globalErrorMiddleware());
  });

  

  return server.build();

}


mySerever()