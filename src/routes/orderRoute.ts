import express from 'express';
import orderCTRL from '../controllers/orderController';
import Auth from '../middleware/auth';

const router = express.Router();

router.get('/',Auth.auth,Auth.dispatcherAuth,orderCTRL.getAllOrders);
router.post('/',Auth.auth,Auth.dispatcherAuth,orderCTRL.postNewOrder);
router.delete('/deleteDelivered',Auth.auth,Auth.dispatcherAuth,orderCTRL.deleteDelivered);


export default router