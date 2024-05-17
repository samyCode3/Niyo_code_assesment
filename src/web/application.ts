import express, { NextFunction, request, response } from "express";
import container from "@core/config/di-container";
import { InversifyExpressServer } from "inversify-express-utils";

import morgan from "morgan";
import { globalErrorMiddleware } from "@core/middleware/global.error";

export class App {
  async setup() {
    const server = new InversifyExpressServer(container, null, {
      rootPath: "/api/v1",
    });
    server.setConfig((app) => {
      app.use(express.json());
      app.get(
        "/",
        (
          request: Request | any,
          response: Response | any,
          next: NextFunction
        ) => {
          return response.send(`Hello Niyo Api`);
        }
      );
      app.use(morgan("dev"));
   
    });

    server.setErrorConfig((app) => {
      app.all("*", (request, response) => {
        return response.status(404).json({ error: 404, message: "Route not found" });
      });
      app.use(globalErrorMiddleware());
    });

    const app = server.build();

    app.listen(5000, () =>
      console.log(`server running on http://localhost:5000`)
    );
  }
}
