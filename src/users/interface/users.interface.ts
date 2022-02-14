import { Document } from "mongoose";

export interface Users extends Document{
    name:String,
    age:Number,
    email:String,
    password:String,
    role:String,
    technology:String,
    token:String,
    status:String
}