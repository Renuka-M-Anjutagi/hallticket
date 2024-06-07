import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    customername:{
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:String,
        required:true,
    },
    starttime:{
        type:String,
        required:true,
        
    },
    endtime:{
        type:String,
        required:true,
        
    },

    roomID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'rooms'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

},{timestamps:true})

export default mongoose.model('bookings',bookingSchema);