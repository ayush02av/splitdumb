import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    passwordConfirm: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value === this.password
            },
            message: "Passwords do not match"
        },
    },
}, {timestamps: true});

userSchema.pre("save", async function() {
    //Only run this fn it password was modified
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
})

userSchema.methods.correctPassword = async function(enteredPassword, userPassword){
    const password1 = await bcrypt.hash(enteredPassword, 12);
    const password2 = await bcrypt.hash(userPassword, 12);

    return await bcrypt.compare(enteredPassword, userPassword)
}

export default mongoose.model("User", userSchema);