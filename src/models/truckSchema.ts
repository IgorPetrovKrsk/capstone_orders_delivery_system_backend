import mongoose, { Document, Model } from "mongoose";

interface ITruck extends Document {
  licensePlate: string;
  driver?: string;
  capacity: number;
  status: "available" | "en route" | "idle" | "repairs";
}

interface TruckModel extends Model<ITruck> {
  findAllIdleTrucks(): Promise<ITruck[]>;
  findAllAvailableTrucks(): Promise<ITruck[]>;
}


const truckSchema = new mongoose.Schema<ITruck>({
    licensePlate: {
        type: String,
        required: [true, 'Licence plate is required'],
        unique: [true, 'Licence plate should be unique']
    },    
    capacity: {
        type: Number,
        required: true,
        min: [0, 'Capacity cannot be less that 0'],
        max: [20000, 'Where did you get that kind of truck?!?!?!']
    },
    status: {
        type: String,
        enum: {
            values: ['available', 'en route', 'idle', 'repairs'],
            message: '{VALUE} is not a valid status. Please choose from available, en route, idle, or repairs.'
        },
        default: 'idle'
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


export default mongoose.model<ITruck, TruckModel>("Truck", truckSchema)
