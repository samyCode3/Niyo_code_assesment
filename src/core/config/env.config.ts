import { validateEnvField } from "@core/utils/validation/env.validate";
import dotenv from "dotenv";
dotenv.config();

const envVars = process.env;
export const config = {
  NODE_Env: envVars.NODE_Env,
  port: envVars.PORT,
  DB_HOST: envVars.DB_HOST,
  DB_PORT: envVars.DB_PORT,
  DB_USER: envVars.DB_USER,
  DB_PASS: envVars.DB_PASS,
  DB_NAME: envVars.DB_NAME,
  REDIS_URL: envVars.REDIS_URL,
};

validateEnvField(config);
