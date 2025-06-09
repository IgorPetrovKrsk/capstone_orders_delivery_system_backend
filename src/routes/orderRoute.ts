import express from 'express';
import orderCTRL from '../controllers/orderController';
import Auth from '../middleware/auth';

const router = express.Router();

router.get('/',Auth.auth,Auth.dispatcherAuth,orderCTRL.getAllOrders);
router.get('/undeliveredOrdersByUserId',Auth.auth,orderCTRL.undeliveredOrdersByUserId); //user will be in req.user after auth middleware
router.get('/pendingassignedorders',Auth.auth,Auth.dispatcherAuth,orderCTRL.pendingAssignedOrders); 
router.post('/',Auth.auth,Auth.dispatcherAuth,orderCTRL.postNewOrder);
router.put('/return/:orderId',Auth.auth,orderCTRL.returnOrderById);
router.put('/deliver/:orderId',Auth.auth,orderCTRL.deliverOrderById);
router.put('/:orderId',Auth.auth,Auth.dispatcherAuth,orderCTRL.updateOrderById);
router.delete('/:orderId',Auth.auth,Auth.dispatcherAuth,orderCTRL.deleteOrderById);

//router.delete('/deleteDelivered',Auth.auth,Auth.dispatcherAuth,orderCTRL.deleteDelivered);


export default router