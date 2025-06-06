import { Request, Response } from 'express'
import Users from '../models/userSchema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

interface RequestWithUser extends Request {
    user?: any; //should define user folowing the User schema
}

dotenv.config();
const jwtSecret = process.env.JWTSECRET ?? '';


async function getAllUsers(req: Request, res: Response) {
    const allUsers = await Users.find({}).populate('truck').select('-password');
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
                res.status(401).json({ error: [{ msg: 'Authentication failed' }] });
                return;
            }
            if (!user.isActive) {
                res.status(401).json({ error: [{ msg: 'User is not active. Talk to the GOD (Admin)' }] });
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
                res.status(201).json({ 'token': token });
                return;
            });
        } else {
            res.status(401).json({ error: [{ msg: 'Authentication failed' }] });
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
        res.status(400).json({ error: [{ msg: `User with the username ${username} already exists` }] });
        return;
    }

    user = new Users({ username, role, truck });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    delete user.password; //removing password from response
    res.status(201).json(user);
    return;
}

async function deleteUserById(req: Request, res: Response) {
    const userId = req.params.userId;
    const deletedUser = await Users.findOneAndDelete({ _id: userId });
    res.status(200).json({ status: [{ msg: `User ${deletedUser?.username} has been deleted.` }] });
    return;
}

async function updateUserById(req: Request, res: Response) {
    const username = req.body.username;
    if (username) {
        const user = await Users.findOne({ username });
        if (user && user._id.toString() != req.params.userId) {
            res.status(400).json({ error: [{ msg: `User with the username ${username} already exists` }] });
            return;
        }
    }
    const password = req.body.password;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
    }
    const updatedUser = await Users.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true, runValidators: true }).select('-password'); //should not return password
    if (!updatedUser) {
        res.status(400).json({ err: [{ msg: `Cannot find user with id ${req.params.userId}` }] })
    }
    res.status(200).json(updatedUser);
}

async function getUserByToken(req: RequestWithUser, res: Response) {
    if (!req.user.isActive) {
        res.status(401).json({ error: [{ msg: 'User is not active. Talk to the GOD (Admin)' }] });
        return;
    }
    res.status(200).json(req.user); //user was decoded by Auth middleware    
}

export default { login, getAllUsers, deleteUserById, createNewUser, updateUserById, getUserByToken }

