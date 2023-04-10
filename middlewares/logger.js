const log4js = require("log4js");
log4js.configure({
  appenders: {
    logConsole: { type: "console" },
    logFile1: { type: "file", filename: "./Logs/warn.log" },
    logFile2: { type: "file", filename: "./Logs/error.log" },
  },
  categories: {
    default: { appenders: ["logConsole"], level: "info" },
    fileWarn: { appenders: ["logFile1", "logConsole"], level: "warn" },
    fileError: { appenders: ["logFile2", "logConsole"], level: "error" },
  },
});

let logger = log4js.getLogger();

module.exports = { logger };
