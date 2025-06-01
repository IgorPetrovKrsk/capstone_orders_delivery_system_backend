import express from 'express';
import messagesController from '../controllers/messagesController';

const router = express.Router();

router
    .route('/')
    .get(messagesController.getAllMessages)
    .post(messagesController.postNewMessage)
    .delete(messagesController.deleteAllMessages)
    .patch(messagesController.methodNotAllowed); // this is not DRY

router
    .route('/:messageId')
    .get(messagesController.getMessageByTruckId) //in this case messageId is Truck Id
    .patch(messagesController.patchMessageById)
    .delete(messagesController.deleteMessageById)
    .post(messagesController.methodNotAllowed);

export default router;
