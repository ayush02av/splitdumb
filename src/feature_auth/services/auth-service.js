import User from "../entities/User.js";
import jwt from "jsonwebtoken";
import { correctPassword } from "../helpers/auth-helper.js";
import { authConfig } from "../../config/config.js";

const signToken = id => {
    return jwt.sign({ id }, authConfig.jwt.secret, {
        expiresIn: authConfig.jwt.expiresIn
    })
}

const createSendToken = (user) => {
    const token = signToken(user._id);

    return token;
}

export const signupUser = async (userSignupRequest) => {
    const { name, email, phoneNumber, password } = userSignupRequest;

    // Validate required fields
    if (!name || !email || !password) {
        throw new Error("Please provide all required fields");
    }

    const newUser = new User({
        name,
        email,
        phoneNumber,
        password
    })

    const savedUser = await newUser.save();

    // Remove password from response
    savedUser.password = undefined;

    //Generate Token
    const token = createSendToken(savedUser);
    
    return { user: savedUser, token }
}

export const loginUser = async (userLoginRequest) => {
    const { email, password } = userLoginRequest;

    //Check if email and pwd exists
    if (!email || !password) {
        throw new Error("Please provide email and password");
    }

    //Check if user exists and password matches
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await correctPassword(password, user.password))) {
        throw new Error("Incorrect email or password");
    }

    user.password = undefined;

    //Generate Token
    const token = createSendToken(user);

    return { user, token };
}