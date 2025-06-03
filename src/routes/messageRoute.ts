import express from 'express';
import messageCTRL from '../controllers/messageController';
import Auth from '../middleware/auth';

const router = express.Router();

router.get('/',Auth.auth,Auth.dispatcherAuth,messageCTRL.getAllMessages);
router.get('/:truckId',Auth.auth,messageCTRL.getMessagesByTruckId); //any authorised user can read thouse
// router.get('/:statusOrLicencePlate',messageCTRL.getAllMessagesByStatusOrLicencePlate);
router.post('/',Auth.auth,Auth.dispatcherAuth,messageCTRL.createNewMessage);
// router.put('/:id',messageCTRL.updateMessageById);
router.delete('/:messageId',Auth.auth,Auth.dispatcherAuth,messageCTRL.deleteMessageById);
// router.get('/search/:text',messageCTRL.searchForText)

export default router