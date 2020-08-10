const winston = require("winston");
require("express-async-errors");

module.exports = function() {
  // winston.add(winston.transports.Console, {
  //   name : 'UNIQUE_NAME_HERE',
  //   level: 'warn',
  //   handleExceptions: true
  // });
  winston.handleExceptions(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    console.log("Logging")
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
};
