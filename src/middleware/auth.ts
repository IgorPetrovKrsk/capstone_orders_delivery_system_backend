import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User, { UserRoles } from '../models/userSchema';

interface RequestWithUser extends Request {
    user?: any; //should define user folowing the User schema
}

interface JwtDecoded {
    user: {
        id: string;
    };
}

dotenv.config();
const jwtSecret = process.env.JWTSECRET ?? '';

async function auth(req: RequestWithUser, res: Response, next: NextFunction) {
    const token = req.header('token');

    if (!token) {
        res.status(401).json({ error: [{ msg: 'No Token, Auth Denied' }] });
        return;
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtDecoded;
        const userId = decoded.user.id;
        const user = await User.findById(userId).select('-password');
        req.user = user;
        next();
        return;
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: [{ msg: 'Token is not Valid ' }] });
    }
}

async function adminAuth(req: RequestWithUser, res: Response, next: NextFunction) {
    const user = req.user;
    if (!user || user.role !== UserRoles.admin) {
        res.status(401).json({ error: [{ msg: 'Invalid admin token' }]});
        return;
    } else {
        next();
        return;
    }
}

async function dispatcherAuth(req: RequestWithUser, res: Response, next: NextFunction) {
    const user = req.user;
    if (!user || user.role !== UserRoles.dispatcher) {
        res.status(401).json({ error: [{ msg: 'Invalid dispatcher token'}]});
        return;
    } else {
        next();
        return;
    }
}

export default {auth, adminAuth,dispatcherAuth}