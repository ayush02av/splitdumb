import mongoose from "mongoose";
import {hashPassword} from "../helpers/auth-helper.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength:1,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
}, {timestamps: true});

userSchema.pre("save", async function() {
    //Only run this fn it password was modified
    if(!this.isModified("password")) return;

    this.password = await hashPassword(this.password);
})

export default mongoose.model("User", userSchema);