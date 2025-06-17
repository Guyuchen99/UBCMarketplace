import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { authRouter } from "./modules/auth/auth.routes.js";
import { postingRouter } from "./modules/posting/posting.routes.js";
import { savedListRouter } from "./modules/saved-list/saved-list.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("MongoDB Connected");
	})
	.catch((error) => {
		console.log(`MongoDB Connection Failed: ${error}`);
	});

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: ["GET", "POST", "DELETE", "PUT"],
		allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires"],
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/posting", postingRouter);
app.use("/api/saved-list", savedListRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
