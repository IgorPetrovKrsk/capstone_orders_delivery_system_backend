import express from 'express';
import messageCTRL from '../controllers/messageController';

const router = express.Router();

router.get('/',messageCTRL.getAllMessages);
router.get('/:statusOrLicencePlate',messageCTRL.getAllMessagesByStatusOrLicencePlate);
router.post('/',messageCTRL.postNewMessage);
router.put('/:id',messageCTRL.updateMessageById);
router.delete('/:id',messageCTRL.deleteMessageById);
router.get('/search/:text',messageCTRL.searchForText)

export default router