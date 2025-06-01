
import orders, { Order, OrderStatus } from '../data/orders';
import { Request, Response, NextFunction } from 'express';
import hateoas from '../hateoas/hateoas';
import error from '../error/error';

function getAllOrders(req: Request, res: Response) {
    const orderLinks = hateoas.getOrdersLinks();
    res.json({ orders, orderLinks });
}

function postNewOrder(req: Request, res: Response, next: NextFunction) {
    if (orders.find((it) => it.id == req.body.id)) { //id is already exists
        next(error(406, `Order with ID ${req.body.id} already exists`));
    } else if (req.body.id && req.body.origin && req.body.destination && req.body.weight) {
        const newOrder: Order = {
            id: req.body.id,
            origin: req.body.origin, //can be null
            destination: req.body.destination,
            weight: req.body.weight,
            status: (req.body.status) ? OrderStatus[req.body.status as keyof typeof OrderStatus] : OrderStatus.Pending, //if there is no status present then default status is Pending
            truckId: req.body.truckId
        };
        orders.push(newOrder);
        res.json(orders[orders.length - 1]);
    } else
        next(error(400, 'Insufficient Data'));
}

function deleteAllOrders(req: Request, res: Response) {
    orders.length = 0; //clearing the array
    res.json({ orders });
}

//functions what works with id
function getOrderById(req: Request, res: Response, next: NextFunction) {
    const orderId = req.query.orderId ? req.query.orderId as string : req.params.orderId;
    const orderByIdLinks = hateoas.getOrderByIdLinks(orderId);
    const order = orders.find((it) => it.id == orderId);

    if (order)
        res.json({ order, orderByIdLinks });
    else
        next();
}

function patchOrderById(req: Request, res: Response, next: NextFunction) {
    const orderId = req.query.orderId ? req.query.orderId as string : req.params.orderId;
    const order = orders.find((it) => it.id === orderId);
    if (order && order.status !== OrderStatus.Pending) {
        next(error(403, 'It is forbidden to change orders that are not pending'));
    } else if (order) {
        for (const key in req.body) {
            //@ts-ignore                  //I don't know how to fix this TS error so just ignoring
            order[key] = req.body[key];
        }
        res.json({ order });
    }
    else
        next();
}

function deleteOrderById(req: Request, res: Response, next: NextFunction) {
    const orderId = req.query.orderId ? req.query.orderId as string : req.params.orderId;
    const order = orders.find((it, i) => {
        if (it.id == orderId) {
            orders.splice(i, 1);
            return true;
        }
    });

    if (order) res.json(order);
    else
        next();
}

function methodNotAllowed(req: Request, res: Response, next: NextFunction) {
    next(error(405, 'Method Not Allowed'));
}

export default { getAllOrders, postNewOrder, deleteAllOrders, methodNotAllowed, getOrderById, patchOrderById, deleteOrderById }
