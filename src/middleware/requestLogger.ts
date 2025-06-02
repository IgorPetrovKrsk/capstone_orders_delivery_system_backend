import { Request, Response, NextFunction } from "express";
import winston from 'winston';

const logger = winston.createLogger({
    level: 'http',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'http.log' })
    ]
});
//logger.info('This is a test winston message');

//winston to log all incoming http requests
export function requestLogger(req: Request, res: Response, next: NextFunction) {
    logger.http(`${new Date().toISOString()} Incoming request: ${req.method} ${req.url}`);
    logger.info({
        method: req.method,
        url: req.url,
        body: req.body,
        headers: req.headers,
    });
    next();
};
