import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: [true, 'Order origin is required']
    },
    originCoordinates: {
        type: {
            longitude: { type: Number, required: true },
            latitude: { type: Number, required: true },
        },
        required: true
    },
    destination: {
        type: String,
        required: [true, 'Order destination is required']
    },
    destinationCoordinates: {
        type: {
            longitude: { type: Number, required: true },
            latitude: { type: Number, required: true },
        },
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ['Pending', 'Assigned', 'Delivered', 'Returned'],
        },
        default: 'Pending'
    },
    weight: {
        type: Number,
        required: true,
        min: [0, 'Order weight cannot be less that 0'],
        max: [10000, 'Order with weight of {value} cannot be transported by any of the trucks']
    },
    truck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Truck"
    },
});

orderSchema.index({ truckLicencePlate: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ origin: 1 });

// ✅ Optional geospatial index (if needed for location queries) //this is copilot //I don't know if I would use them but it is nice to have
orderSchema.index({ "originCoordinates.longitude": 1, "originCoordinates.latitude": 1 });
orderSchema.index({ "destinationCoordinates.longitude": 1, "destinationCoordinates.latitude": 1 })

export default mongoose.model("Order", orderSchema)
