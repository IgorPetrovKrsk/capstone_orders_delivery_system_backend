import Orders from '../models/orderSchema.js';

async function getAllOrders(req, res) {
    const allOrders = await Orders.find({});
    res.json(allOrders);
}

async function getOrdersByLicensePlate(req, res) {
    const orders = await Orders.find({ truckLicencePlate: req.params.licensePlate });
    if (!orders || orders.length == 0) {
        res.json({ err: `Cannot find orders for truck with license plate ${req.params.licensePlate}` })
    } else {
        res.json(orders);
    }
}

async function postNewOrder(req, res) {
    delete req.body.status; //date and status should be schemas default
    const newOrder = await Orders.create(req.body);
    res.status(201).json(newOrder);
}

async function deleteDelivered(req, res) {
    const deletedTruck = await Orders.deleteMany({ status: 'Delivered' });
    res.status(204).json({ status: `All delivered orders has been deleted.` });
}

export default { getAllOrders, postNewOrder, deleteDelivered, getOrdersByLicensePlate }

