import { User } from "@logic/auth/entity/auth.entity";
import joi, { ObjectSchema } from "joi";
import validator from "../validator";

export const validateRegisterField = async (body: any): Promise<User> => {
  const schema: ObjectSchema = joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    username: joi.string().required().trim(),
    email: joi.string().email().required().trim(),
    phone_number: joi.string().required(),
    password: joi.string().min(8).max(10000).required(),
  });

  return validator(schema, body);
};

export const validateOtpField = async (body: any) => {
  const schema: ObjectSchema = joi.object().keys({
    code: joi.string().required(),
  });

  return validator(schema, body);
};
export const validateLoginField = async (body: any) => {
  const schema: ObjectSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required()
  });

  return validator(schema, body);
};
