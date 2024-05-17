import joi, { ObjectSchema } from "joi";
import validator from "../validator";
import { TaskManager } from "@logic/task_manager/entity/task_manager.entity";

export const validateTaskField = async (body: any): Promise<TaskManager> => {
  const schema: ObjectSchema = joi.object().keys({
    task_name: joi.string().required().min(4).max(20),
    task_description: joi.string().required(),
    priority: joi.string().required().valid('Normal', 'High'),
    start_date: joi.string().required(),
    end_date: joi.string().required(),
  });

  return validator(schema, body);
};

export const validateParamsId = async (body: any) => {
  const schema: ObjectSchema = joi.object().keys({
    id: joi.string().required()
  });

  return validator(schema, body);
}


export const validateUpdateTaskField = async (body: any): Promise<TaskManager> => {
  const schema: ObjectSchema = joi.object().keys({
    id: joi.string().required().id(),
    task_name: joi.string().min(4).max(20),
    task_description: joi.string(),
    priority: joi.string().valid('Normal', 'High'),
    start_date: joi.string(),
    end_date: joi.string(),
    status: joi.string().valid('Almost done', 'Completed', 'Pending')
  });
  return validator(schema, body);
}