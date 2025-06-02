import {Request,Response,NextFunction} from 'express'

export function globalErrorHandler(err:Error, req:Request, res:Response, next:NextFunction) {
    res.status(500).json({ error: [{ msg: err.message }] });
}