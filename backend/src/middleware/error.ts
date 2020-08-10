import { Request, Response } from "express";

const winston = require("winston");

module.exports = function(err, req:Request, res:Response, next) {
  winston.error(err.message, err);
  console.log("hello")
  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send({ message: "Something failed.", success: false });
};
