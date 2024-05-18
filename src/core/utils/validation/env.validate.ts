

import joi, { ObjectSchema } from "joi";
import validator from "../validator";


export const validateTaskField = async (body: any) => {
  const schema: ObjectSchema = joi.object().keys({
    NODE_ENV: joi.string().valid('development', 'production', 'test').required(),
    PORT: joi.number().default(5003),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().default(3306),
    DB_USER: joi.string().required(),
    DB_PASS: joi.string().required(),
    DB_NAME: joi.string().required(),
    REDIS_URL: joi.string().required(),
    SECRET_TOKEN: joi.string().required(),

  }).unknown().required();

  return validator(schema, body);
};

