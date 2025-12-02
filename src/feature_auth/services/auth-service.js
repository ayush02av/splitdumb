import User from "../entities/User.js";

export const signupUser = async (userSignupRequest) => {
    const newUser = new User({
        name: userSignupRequest.name,
        email: userSignupRequest.email,
        phoneNumber: userSignupRequest.phoneNumber
    })
    return await newUser.save();
}