import express from 'express';
import orderCTRL from '../controllers/orderController';

const router = express.Router();

router.get('/',orderCTRL.getAllOrders);
router.post('/',orderCTRL.postNewOrder);
router.delete('/deleteDelivered',orderCTRL.deleteDelivered);
router.get('/:licensePlate',orderCTRL.getOrdersByLicensePlate);

export default router