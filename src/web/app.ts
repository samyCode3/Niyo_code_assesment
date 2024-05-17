import "reflect-metadata";


import { App } from "@web/application";
import "@core/config/redis.config";
import "@core/config/redis.config";

export const bootstrap = async () => {
  new App().setup();
};

bootstrap();
  