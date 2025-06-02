import express, { Request, Response } from 'express';
import Trucks from '../models/truckSchema';
import Orders from '../models/orderSchema';
import Messages from '../models/messageSchema';
import Users from '../models/userSchema';
import { trucksSeed, ordersSeed, messagesSeed, usersSeed } from '../seeds/seeds';
import { createValidationRules } from '../db/conn'

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    await Promise.all([Trucks.deleteMany({}), Orders.deleteMany({}), Messages.deleteMany({}), Users.deleteMany({})]); //awaiting all simultaneously
    await Promise.all([Trucks.create(trucksSeed), Orders.create(ordersSeed), Messages.create(messagesSeed), Users.create(usersSeed)]);//seeding all simultaneously
    res.send('Seeding done');
    createValidationRules();
});

export default router