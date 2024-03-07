import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export default function Connect() {
    mongoose.connect(process.env.URL!, {
        dbName:'notes',
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => console.error('MongoDB connection error:', error.message));
}

