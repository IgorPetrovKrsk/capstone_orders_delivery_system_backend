import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWTSECRET ?? '';

function auth(req:Request, res:Response,next:NextFunction){
    const token = req.header('x-auth-token');

    if (!token){
        return res.status(401).json({errors: [{msg: 'No Token, Auth Denied'}]});
    }

    try {
        const decoded = jwt.verify(token,jwtSecret);
        //req.user = decoded.user;
        next();        
    } catch (err) {
        console.error(err);
        res.status(401).json({errors:[{msg: 'Token is not Valid '}]});
    }
}

async function adminAuth(req:Request, res:Response, next:NextFunction) {
    // const userId = req.user;
    // const user = await User.findById(userId.id).select('admin');
    // if (!user || !user.admin) {
    //     return res.status(401).json({ msg: 'Invalid admin token' });
    // } else {
         next();
    // }
}


export default { auth, adminAuth }