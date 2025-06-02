import mongoose from "mongoose";

const truckSchema = new mongoose.Schema({
    licensePlate: {
        type: String,
        required: [true, 'Licence plate is required'],
        unique: [true, 'Licence plate should be unique']
    },
    driver: String,
    capacity: {
        type: Number,
        required: true,
        min: [0, 'Capacity cannot be less that 0'],
        max: [20000, 'Where did you get that kind of truck?!?!?!']
    },
    status: {
        type: String,
        enum: {
            values: ['Available', 'En Route', 'Idle', 'Repairs'],
            message: '{VALUE} is not a valid status. Please choose from Available, En Route, Idle, or Repairs.'
        },
        default: 'Idle'
    }
});

//duplicate index I think this is because licence plate is unique
//truckSchema.index({licensePlate:1}); //first index is license plate, because all of the searching is done by licence plate
truckSchema.index({status:1}); //second index is status because it is common to find all idle or avalable trucks

truckSchema.statics.findAllIdleTrucks = function () {
    return this.find({status: 'Idle'});
}

truckSchema.statics.findAllAvailableTrucks = function () {
    return this.find({status: 'Available'});}


export default mongoose.model("Truck", truckSchema)
