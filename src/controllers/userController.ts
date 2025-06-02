import { Request, Response } from 'express'
import Users from '../models/userSchema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWTSECRET ?? '';


async function getAllUsers(req: Request, res: Response) {
    const allUsers = await Users.find({}).select('-password');
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
                res.status(201).json({ 'x-auth-token': token });
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

async function createNewUser(req: Request, res: Response) {
    const { username, password, role, truck } = req.body;
    if (!username || !password || !role) {
        res.status(400).json({ error: [{ msg: 'Username, role and password are required.' }] });
        return;
    }
    let user = await Users.findOne({ username });
    if (user) {
        res.status(400).json({ error: [{ msg: 'Username already exists'}] });
        return;
    }

    user = new Users({ username, role,truck});

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(200).json({ status: [{ msg: `User ${user.username} has been created.` }] });
    return;
}

async function deleteUserById(req: Request, res: Response) {
    const userId = req.params.userId;
    const deletedUser = await Users.findOneAndDelete({ _id: userId });
    res.status(200).json({ status: [{ msg: `User ${deletedUser?.username} has been deleted.` }] });
    return;
}

export default { login, getAllUsers,deleteUserById,createNewUser }

