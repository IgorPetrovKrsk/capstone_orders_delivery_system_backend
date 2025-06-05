import mongoose from "mongoose";

export enum UserRoles {
  admin = "admin",
  dispatcher = "dispatcher",
  driver = "driver",
}


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']        
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'dispatcher', 'driver'],
        },
        default: 'driver'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    truck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Truck"
    },
    password:
    {
        type: String
    },
    imgUrl: { 
        type: String
    }
});

userSchema.index({ isActive: 1 });

export default mongoose.model("User", userSchema)
