import winston from "winston";

const logger = winston.createLogger({
  // level
  level: process.env.DEVELOPEMENT_LEVEL ? "info" : "debug",
  format: winston.format.combine([
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ]),
  defaultMeta: { service: "book-api-service" },
  transports: [
    new winston.transports.Console(
      {
        format: winston.format.combine(
          // for error logs
          winston.format.colorize(),
          winston.format.simple()
          // for combine logs
        ),
      },
      new winston.transports.File({ filename: "combined.log", level: "info" })
    ),
  ],
});
