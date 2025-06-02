import {Request,Response} from 'express'
import Users from '../models/userSchema';

async function getAllUsers(req:Request, res:Response) {
    const allUsers = await Users.find({});
    res.json(allUsers);
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

//export default { getAllOrders, postNewOrder, deleteDelivered, getOrdersByLicensePlate }

