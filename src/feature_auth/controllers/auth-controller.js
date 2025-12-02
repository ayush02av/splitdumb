import express from "express";
import {signupUser} from "../services/auth-service.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    return res.json(await signupUser(req.body));
});

authRouter.get("/login", async (req, res) => {
    return res.send("Login done");
});

export default authRouter;