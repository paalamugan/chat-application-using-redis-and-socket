"use strict";

const { format } = require("winston");

const { colorize, combine, timestamp, errors, printf, splat } = format;

let options = {
    console: {
        level: "debug", // Only log if console level less than or equal to this level
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp: true,
        prettyPrint: true,
    },
};

const winstonFormat = combine(
    format((info) => {
        info.level = info.level.toUpperCase();
        return info;
    })(),
    colorize(),
    timestamp(),
    splat(),
    errors(),
    printf(({ timestamp, level, message, ...rest }) => {
        let restString = rest?.stack;

        if (!restString) {
            restString = JSON.stringify(rest, null, 2);
            restString = restString === "{}" ? "" : restString;
        }

        return `[${timestamp}] ${level}: ${message} ${restString}`;
    })
);

let logger = winston.createLogger({
    format: winstonFormat,
    transports: [new winston.transports.Console(options.console)],
    exitOnError: false, // Do not exit on handled exceptions
});

// Create stream object with 'write' function that will be used by `morgan`
logger.stream = {
    write: function (msg) {
        logger.info(msg);
    },
};

module.exports = logger;
