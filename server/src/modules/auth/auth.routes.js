import express from "express";
import { authMiddleware, loginUser, logoutUser, registerUser } from "./auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.post("/logout", logoutUser);

authRouter.get("/check-auth", authMiddleware, (req, res) => {
	const user = req.user;
	res.status(200).json({ success: true, message: "Authenticated user", user });
});
