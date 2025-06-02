import mongoose from "mongoose";

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
        type: String,
        required: [true, 'Password should be 6 symbols min'],
        minLength: 6
    },

});

userSchema.index({ isActive: 1 });

export default mongoose.model("User", userSchema)
