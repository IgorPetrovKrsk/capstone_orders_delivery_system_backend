import express from 'express';
import orderCTRL from '../controllers/orderController';
import Auth from '../middleware/auth';

const router = express.Router();

router.get('/',Auth.auth,Auth.dispatcherAuth,orderCTRL.getAllOrders);
router.post('/',Auth.auth,Auth.dispatcherAuth,orderCTRL.postNewOrder);
router.put('/:orderId',Auth.auth,Auth.dispatcherAuth,orderCTRL.updateOrderById);
router.delete('/:orderId',Auth.auth,Auth.dispatcherAuth,orderCTRL.deleteOrderById);
//router.delete('/deleteDelivered',Auth.auth,Auth.dispatcherAuth,orderCTRL.deleteDelivered);


export default router