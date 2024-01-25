const { format, createLogger, transports } = require("winston");
require("winston-daily-rotate-file");
const { combine, label, json, printf } = format;

const CATEGORY = "Log Rotation";

const fileRotateTransport = new transports.DailyRotateFile({
  filename: "logs/rotate-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});

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
    [key: string]: any;
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
