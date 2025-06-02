import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    truck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Truck"
    },
    status: {
        type: String,
        enum: {
            values: ['Pending', 'Delivered', 'Read'],
        },
        default: 'Pending'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
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
messageSchema.index({ '$**': 'text' }); //wildcard index for full text search

export default mongoose.model("Message", messageSchema)
