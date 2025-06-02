import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    truckLicencePlate: {
        type: String,
        required: [true, 'Licence plate is required']
    },
    status: {
        type: String,
        enum: {
            values: ['Pending', 'Delivered', 'Read'],
        },
        default: 'Pending'
    },
    orderId: String,
    content: {
        type: String,
        required: [true, 'Message cannot be empty']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

messageSchema.index({ truckLicencePlate: 1 });
messageSchema.index({ status: 1 });
messageSchema.index({ date: -1 }); //to find all messages from today or last day.
messageSchema.index({'$**': 'text'}); //wildcard index for full text search

export default mongoose.model("Message", messageSchema)
