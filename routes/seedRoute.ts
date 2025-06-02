import express from 'express';
import Trucks from '../models/truckSchema.js';
import Orders from '../models/orderSchema.js';
import Messages from '../models/messageSchema.js';
import {trucksSeed,ordersSeed,messagesSeed} from '../seeds/seeds.js';
import {createValidationRules} from '../db/conn.js'

const router = express.Router();

router.post('/',async (req,res)=>{

 
    console.time('Promise all');
    await Promise.all([Trucks.deleteMany({}), Orders.deleteMany({}), Messages.deleteMany({})]); //awaiting all simultaneously
    await Promise.all([Trucks.create(trucksSeed),Orders.create(ordersSeed),Messages.create(messagesSeed)]);//seeding all simultaneously
    console.timeEnd('Promise all');
    console.time('Await separetly');
    await Trucks.deleteMany({});
    await Orders.deleteMany({}); 
    await Messages.deleteMany({});
    await Trucks.create(trucksSeed);
    await Orders.create(ordersSeed);
    await Messages.create(messagesSeed);
    console.timeEnd('Await separetly');
    res.send('Seeding done');
    createValidationRules();
});

export default router