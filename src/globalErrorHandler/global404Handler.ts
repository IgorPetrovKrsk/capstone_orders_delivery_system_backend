import {Request,Response,NextFunction} from 'express'

export function global404Handler(req:Request, res:Response, next:NextFunction) {
    res.status(404).json({ error: [{ msg: 'Resource Not Found'}] });
}