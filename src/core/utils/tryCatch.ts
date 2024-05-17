import { NextFunction } from "express";

const asyncFunction = (func: any) => {
  return (request: Request | any, response:  Response | any, next: NextFunction) => {
    func(request, response, next).catch((err) => next(err));
  };
};

export default asyncFunction;
