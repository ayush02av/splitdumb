import User from "../entities/User.js";
import jwt from "jsonwebtoken";

const Secret = "Shhh123"
const Expires_In = "90d";

const signToken = id => {
    return jwt.sign({id}, Secret, {
        expiresIn: Expires_In
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user
        }
    })
}

export const signupUser = async (userSignupRequest) => {
    const newUser = new User({
        name: userSignupRequest.name,
        email: userSignupRequest.email,
        phoneNumber: userSignupRequest.phoneNumber,
        password: userSignupRequest.password,
        passwordConfirm: userSignupRequest.passwordConfirm,
    })
    return await newUser.save();
}

export const loginUser = async (userLoginRequest, res) => {
    const {email, password} = userLoginRequest;

    //Check if email and pwd exists
    if(!email || !password){
        throw new Error("Please provide email and password");
    }
   
    //Check if user exists and password matches
    const user = await User.findOne({email}).select("+password");
    if(!user || !(await user.correctPassword(password, user.password))){
        throw new Error("Incorrect email or password");
    }

    //Generate Token
    createSendToken(user, 200, res);
}