import { ObjectSchema } from "joi";
import { StatusCodes } from "http-status-codes";
import { ApplicationError } from "../../core/module/internal/error/error";

export default (schema : ObjectSchema, body : any) =>{
    const { error, value } = schema.validate(body,{abortEarly: true});
    console.log({error})
    if(error){
        throw new ApplicationError(StatusCodes.BAD_REQUEST, error.details[0].message)
    }

    return value;
}  