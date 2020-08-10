import { Request } from "express";

module.exports = function(handler) {
  return async (req:Request, res:Response, next) => {
    try {
      console.log(req);
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};
