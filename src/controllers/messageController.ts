import {Request,Response} from 'express'
import Messages from '../models/messageSchema';
import mongoose from 'mongoose';

async function getAllMessages(req:Request, res:Response) {
    const allMessages = await Messages.find({});
    res.status(200).json(allMessages);
}

async function getMessagesByTruckId(req:Request, res:Response) {
    const truckId = req.params.truckId;
    if (!truckId || !mongoose.Types.ObjectId.isValid(truckId)) {
        res.status(200).json({}); //returning empty object
        return;
    }
    const allMessages = await Messages.find({truck:req.params.truckId});
    res.status(200).json(allMessages);
}


// async function getAllMessagesByStatusOrLicencePlate(req:Request, res:Response) {
//     let messages = await Messages.find({ truckLicencePlate: req.params.statusOrLicencePlate });
//     if (!messages || messages.length == 0) {
//         messages = await Messages.find({ status: req.params.statusOrLicencePlate });
//         if (!messages || messages.length == 0) {
//             res.json({ err: `Cannot find messages with license plate or status ${req.params.statusOrLicencePlate}` });
//         } else {
//             res.json(messages);
//         }
//     } else {
//         res.json(messages);
//     }
// }

async function createNewMessage(req:Request, res:Response) {
    delete req.body.status; //date and status should be schemas default
    delete req.body.date;
    const newMessage = await Messages.create(req.body);
    res.status(201).json(newMessage);
}

// async function updateMessageById(req:Request, res:Response) {
//     req.body.date = Date.now();
//     let updatedMessage = await Messages.findById(req.params.id);
//     if (!updatedMessage) {
//         res.json({ err: `Cannot find message with id ${req.params.id}` });
//     } else if (updatedMessage.status != 'pending') {
//         res.json({ err: `Cannot change message witch in not 'pending' id:${req.params.id}` });
//     } else {
//         await updatedMessage.updateOne(req.body, { new: true });
//         res.json(updatedMessage);
//     }
// }

async function deleteMessageById(req:Request, res:Response) {
    const deletedMessage = await Messages.findById(req.params.messageId);
    if (!deletedMessage) {
        res.json({ err: `Cannot find message with id ${req.params.messageId}` })
    } else if (deletedMessage.status != 'pending') {
        res.json({ err: `Cannot delete message witch in not 'pending' id:${req.params.messageId}` });
    } else {
        await Messages.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedMessage);
    }
}

// async function searchForText(req:Request, res:Response) {
//     let messages = await Messages.find({ $text: { $search: req.params.text } });
//     if (!messages || messages.length == 0) {
//         res.json({ err: `Cannot find messages with text:${req.params.text}` });
//     } else {
//         res.json(messages);
//     }
// }

export default { getAllMessages,createNewMessage,deleteMessageById,getMessagesByTruckId }

