import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const mongoUri = process.env.MONGOURI ?? '';
let connection:mongoose.Mongoose;

async function collectDB() {
    try {
        connection = await mongoose.connect(mongoUri);
        console.log(`Connected to MongoDB (TMS)`);        
    } catch (err) {
        console.error(err);
    }
}

export async function createValidationRules() {
    const db = connection.connection.db;  //first connection in mongoose, second is MongoDB.
    await db?.command({
        collMod: "trucks",
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["licensePlate", "capacity", "status"],
                properties: {
                    capacity: {
                        bsonType: "number",
                        minimum: 0,
                        maximum: 20000,
                        description: "Capacity cannot exceed 20000"
                    }
                }
            }
        }
    });
    console.log("Validation rules created successfully!");
}
export default collectDB