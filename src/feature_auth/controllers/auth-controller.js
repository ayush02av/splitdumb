import express from "express";
import {signupUser, loginUser} from "../services/auth-service.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    return res.json(await signupUser(req.body));
});

authRouter.post("/login", async (req, res) => {
    return res.json(await loginUser(req.body, res));
});

export default authRouter;