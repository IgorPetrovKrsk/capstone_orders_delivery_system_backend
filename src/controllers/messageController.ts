import {Request,Response} from 'express'
import Messages from '../models/messageSchema';

async function getAllMessages(req:Request, res:Response) {
    const allMessages = await Messages.find({});
    res.json(allMessages);
}


async function getAllMessagesByStatusOrLicencePlate(req:Request, res:Response) {
    let messages = await Messages.find({ truckLicencePlate: req.params.statusOrLicencePlate });
    if (!messages || messages.length == 0) {
        messages = await Messages.find({ status: req.params.statusOrLicencePlate });
        if (!messages || messages.length == 0) {
            res.json({ err: `Cannot find messages with license plate or status ${req.params.statusOrLicencePlate}` });
        } else {
            res.json(messages);
        }
    } else {
        res.json(messages);
    }
}

async function postNewMessage(req:Request, res:Response) {
    delete req.body.status; //date and status should be schemas default
    delete req.body.date;
    const newMessage = await Messages.create(req.body);
    res.json(newMessage);
}

async function updateMessageById(req:Request, res:Response) {
    req.body.date = Date.now();
    let updatedMessage = await Messages.findById(req.params.id);
    if (!updatedMessage) {
        res.json({ err: `Cannot find message with id ${req.params.id}` });
    } else if (updatedMessage.status != 'Pending') {
        res.json({ err: `Cannot change message witch in not 'Pending' id:${req.params.id}` });
    } else {
        await updatedMessage.updateOne(req.body, { new: true });
        res.json(updatedMessage);
    }
}

async function deleteMessageById(req:Request, res:Response) {
    const deletedMessage = await Messages.findById(req.params.id);
    if (!deletedMessage) {
        res.json({ err: `Cannot find message with id ${req.params.id}` })
    } else if (deletedMessage.status != 'Pending') {
        res.json({ err: `Cannot delete message witch in not 'Pending' id:${req.params.id}` });
    } else {
        await Messages.findByIdAndDelete(req.params.id);
        res.json(deletedMessage);
    }
}

async function searchForText(req:Request, res:Response) {
    let messages = await Messages.find({ $text: { $search: req.params.text } });
    if (!messages || messages.length == 0) {
        res.json({ err: `Cannot find messages with text:${req.params.text}` });
    } else {
        res.json(messages);
    }
}

export default { getAllMessages, getAllMessagesByStatusOrLicencePlate, postNewMessage, updateMessageById, deleteMessageById, searchForText }

