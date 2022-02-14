import * as mongoose from "mongoose";

export const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    technology: {
        type: String,
        required: true
    },
    token:{
        type:String,
        default:null
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });