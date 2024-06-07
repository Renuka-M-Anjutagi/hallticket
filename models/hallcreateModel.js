import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema({

    noofseat:{

        type:Number,
        required:true,
        trim:true,
    },
    amenities:{
        type:String,
        required:true
    },
    priceforperhour:{
        type:Number,
        required:true,

    },
    createdAt: {
        type: Date,
        default: Date.now
    }

},{timestamps:true})

export default mongoose.model('rooms',roomsSchema);