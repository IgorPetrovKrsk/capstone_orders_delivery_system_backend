import express from 'express';
import ordersController from '../controllers/ordersController';

const router = express.Router();

router
    .route('/')
    .get(ordersController.getAllOrders)
    .post(ordersController.postNewOrder)
    .delete(ordersController.deleteAllOrders)
    .patch(ordersController.methodNotAllowed);

router
     .route('/:orderId') 
     .get(ordersController.getOrderById) 
     .patch(ordersController.patchOrderById)
     .delete(ordersController.deleteOrderById)
     .post(ordersController.methodNotAllowed);

export default router;
