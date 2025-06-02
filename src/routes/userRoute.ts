import express from 'express';
import userCTRL from '../controllers/userController';
import Auth from '../middleware/auth';

const router = express.Router();

router.post('/login',userCTRL.login);
router.get('/',Auth.auth,Auth.adminAuth,userCTRL.getAllUsers); //only admin can get all users
router.delete('/:userId',Auth.auth,Auth.adminAuth,userCTRL.deleteUserById);
// router.get('/:licensePlate',userCTRL.getOrdersByLicensePlate);

export default router