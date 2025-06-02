import express from 'express';
import userCTRL from '../controllers/userController';
import Auth from '../middleware/auth';

const router = express.Router();

router.post('/login', userCTRL.login);
router.post('/', Auth.auth, Auth.adminAuth, userCTRL.createNewUser) //only admin can create new users
router.get('/', Auth.auth, Auth.adminAuth, userCTRL.getAllUsers); //only admin can get all users
router.put('/:userId', Auth.auth, Auth.adminAuth, userCTRL.updateUserById);
router.delete('/:userId', Auth.auth, Auth.adminAuth, userCTRL.deleteUserById);

export default router