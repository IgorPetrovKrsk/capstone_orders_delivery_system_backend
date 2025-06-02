import { Request, Response } from 'express'
import Users from '../models/userSchema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWTSECRET ?? '';


async function getAllUsers(req: Request, res: Response) {
    const allUsers = await Users.find({});
    res.json(allUsers);
}

async function login(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: [{ msg: 'Username and password are required.' }] });
        return;
    }
    try {
        let user = await Users.findOne({ username });
        if (user && user?.password) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                res.status(401).json({ msg: 'Authentication failed' });
                return;
            }
            if (!user.isActive) {
                res.status(401).json({ msg: 'User is not active. Talk to the GOD (Admin)' });
                return;
            }
            const payload = {
                user: {
                    id: user._id
                }
            }
            jwt.sign(payload, jwtSecret, {
                expiresIn: 360000,
            }, (err, token) => {
                if (err) throw err;
                res.status(201).json({ token });
                return;
            });            
        } else {
            res.status(401).json({ msg: 'Authentication failed' });
            return;
        }


    } catch (err) {
        res.status(500).json({ error: [{ msg: 'Server error.' }] });
        return;
    }

}

// async function getOrdersByLicensePlate(req:Request, res:Response) {
//     const orders = await Orders.find({ truckLicencePlate: req.params.licensePlate });
//     if (!orders || orders.length == 0) {
//         res.json({ err: `Cannot find orders for truck with license plate ${req.params.licensePlate}` })
//     } else {
//         res.json(orders);
//     }
// }

// async function postNewOrder(req:Request, res:Response) {
//     delete req.body.status; //date and status should be schemas default
//     const newOrder = await Orders.create(req.body);
//     res.status(201).json(newOrder);
// }

// async function deleteDelivered(req:Request, res:Response) {
//     const deletedTruck = await Orders.deleteMany({ status: 'Delivered' });
//     res.status(204).json({ status: `All delivered orders has been deleted.` });
// }

export default { login, getAllUsers }

