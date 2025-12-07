import bcrypt from "bcryptjs";
import {authConfig} from "../../config/config.js";

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, authConfig.bcrypt.saltRounds)
}

export const correctPassword = async function(enteredPassword, userPassword){
    
    return await bcrypt.compare(enteredPassword, userPassword)
}