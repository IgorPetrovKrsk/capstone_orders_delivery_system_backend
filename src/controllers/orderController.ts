import { Request, Response } from 'express'
import Orders from '../models/orderSchema';
import { log } from 'console';

interface RequestWithUser extends Request {
    user?: any; //should define user folowing the User schema
}

async function getAllOrders(req: Request, res: Response) {
    const allOrders = await Orders.find({}).populate('truck');
    res.status(200).json(allOrders);
}

async function getOrdersByTruckId(req: Request, res: Response) {
    const orders = await Orders.find({ truck: req.params.truckId });
    if (!orders || orders.length == 0) {
        res.status(400).json({ error: [{ msg: `Cannot find orders for truck with ID ${req.params.truckId}` }] });
        return;
    } else {
        res.json(orders);
    }
}

async function postNewOrder(req: Request, res: Response) {
    delete req.body.status; //date and status should be schemas default
    delete req.body.date;
    const newOrder = await Orders.create(req.body);
    res.status(201).json(newOrder);
}

async function updateOrderById(req: Request, res: Response) {
    const updatedOrder = await Orders.findOneAndUpdate({ _id: req.params.orderId }, req.body, { new: true, runValidators: true });
    if (!updatedOrder) {
        res.status(400).json({ error: [{ msg: `Cannot update order with id ${req.params.orderId}` }] });
    }
    res.status(201).json(updatedOrder);
}

async function returnOrderById(req: Request, res: Response) {
    const returnedOrder = await Orders.findOneAndUpdate({ _id: req.params.orderId }, {status:'returned'} , { new: true, runValidators: true });
    if (!returnedOrder) {
        res.status(400).json({ error: [{ msg: `Cannot return order with id ${req.params.orderId}` }] });
    }
    res.status(201).json(returnedOrder);
}

async function deliverOrderById(req: Request, res: Response) {
    const returnedOrder = await Orders.findOneAndUpdate({ _id: req.params.orderId }, {status:'delivered'} , { new: true, runValidators: true });
    if (!returnedOrder) {
        res.status(400).json({ error: [{ msg: `Cannot deliver order with id ${req.params.orderId}` }] });
    }
    res.status(201).json(returnedOrder);
}

async function deleteDelivered(req: Request, res: Response) {
    await Orders.deleteMany({ status: 'delivered' });
    res.status(200).json({ status: [{ msg: `All delivered orders has been deleted.` }] });
}

async function deleteOrderById(req: Request, res: Response) {
    const deletedOrder = await Orders.findOneAndDelete({ _id: req.params.orderId });
    res.status(200).json({ status: [{ msg: `Order ${deletedOrder?._id} has been deleted.` }] });
    return;
}

async function undeliveredOrdersByUserId(req: RequestWithUser, res: Response) {
    if (!req.user.truck){
        res.status(400).json({ error: [{ msg: `User ${req.user.username} has not been assigned to a truck.` }] });
        return
    }
    const orders = await Orders.find({status:"assigned",truck: req.user.truck}).populate('truck');
    res.status(200).json(orders);    
}

async function pendingAssignedOrders(req: Request, res: Response) {
    const orders = await Orders.find({status:{$in:['assigned','pending']}}).populate('truck');
    res.status(200).json(orders);    
}

export default { getAllOrders, postNewOrder, deleteDelivered, getOrdersByTruckId, deleteOrderById, updateOrderById,undeliveredOrdersByUserId,returnOrderById,deliverOrderById,pendingAssignedOrders }

