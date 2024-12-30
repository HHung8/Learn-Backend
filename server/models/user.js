import mongoose from "mongoose";
// mongose.Schema dùng để định nghĩa các tài liệu (document) trong MongoDB
const userSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true,
    }
});
export const User = mongoose.model("User", userSchema)