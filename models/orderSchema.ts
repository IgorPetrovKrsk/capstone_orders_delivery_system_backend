import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: [true, 'Order origin is required']
    },
    destination: {
        type: String,
        required: [true, 'Order destination is required']
    },
    status: {
        type: String,
        enum: {
            values: ['Pending', 'Assigned', 'Delivered','Returned'],
        },
        default: 'Pending'
    },
    weight: {
        type: Number,
        required: true,
        min: [0, 'Order weight cannot be less that 0'],
        max: [10000, 'Order with weight of {value} cannot be transported by any of the trucks']
    },
    truckLicencePlate: {
        type: String        
    }
});

orderSchema.index({truckLicencePlate:1});
orderSchema.index({ status: 1 });
orderSchema.index({origin:1});  

export default mongoose.model("Order", orderSchema)
