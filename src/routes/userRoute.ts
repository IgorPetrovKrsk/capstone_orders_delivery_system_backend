import express from 'express';
import userCTRL from '../controllers/userController';
import Auth from '../middleware/auth';

const router = express.Router();

router.get('/',Auth.auth,Auth.adminAuth,userCTRL.getAllUsers);
// router.post('/',userCTRL.postNewOrder);
// router.delete('/deleteDelivered',userCTRL.deleteDelivered);
// router.get('/:licensePlate',userCTRL.getOrdersByLicensePlate);

export default router