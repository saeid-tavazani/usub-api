const { format, createLogger, transports } = require("winston");
require("winston-daily-rotate-file");
const { combine, label, json, printf } = format;

// Label
const CATEGORY = "Log Rotation";

// DailyRotateFile func()
const fileRotateTransport = new transports.DailyRotateFile({
  filename: "logs/rotate-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});

// Custom printf format
// const customFormat = printf(({ level, message, label, timestamp, ...meta }) => {
//   return `${timestamp} [${label}] ${level}: ${message} ${JSON.stringify(meta)}`;
// });

const customFormat = printf(
  ({
    level,
    message,
    label,
    timestamp,
    ...meta
  }: {
    level: string;
    message: string;
    label: string;
    timestamp: string;
    [key: string]: any; // Allow any other properties in meta
  }) => {
    return `${timestamp} [${label}] ${level}: ${message} ${JSON.stringify(
      meta
    )}`;
  }
);

const logger = createLogger({
  level: "debug",
  format: combine(label({ label: CATEGORY }), json(), customFormat),
  transports: [fileRotateTransport, new transports.Console()],
});

export default logger;
