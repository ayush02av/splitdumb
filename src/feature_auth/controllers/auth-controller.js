import express from "express";
import { signupUser, loginUser } from "../services/auth-service.js";
import { sendSignupResponse, sendLoginResponse, sendErrorResponse } from "../views/auth-views.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        const { user, token } = await signupUser(req.body);
        return sendSignupResponse(res, user, token);
    } catch (error) {
        return sendErrorResponse(res, 400, error.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { user, token } = await loginUser(req.body);
        return sendLoginResponse(res, user, token);
    } catch (error) {
        return sendErrorResponse(res, 401, error.message);
    }
});

export default authRouter;