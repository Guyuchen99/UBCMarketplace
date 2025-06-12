import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "./auth.model.js";

export const registerUser = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.json({ success: false, message: "Email already registered" });
		}

		const existingUsername = await User.findOne({ username });
		if (existingUsername) {
			return res.json({ success: false, message: "Username already taken" });
		}

		const hashPassword = await bcrypt.hash(password, 12);

		const newUser = new User({ username, email, password: hashPassword });
		await newUser.save();

		res.json({ success: true, message: "Registration successful" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Some error occurred" });
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const checkUser = await User.findOne({ email });
		if (!checkUser) {
			return res.json({ success: false, message: "User doesn't exist" });
		}

		const checkPassword = await bcrypt.compare(password, checkUser.password);
		if (!checkPassword) {
			return res.json({ success: false, message: "Incorrect password" });
		}

		const token = jwt.sign(
			{
				id: checkUser._id,
				email: checkUser.email,
				username: checkUser.username,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.cookie("myCookie", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});

		res.json({
			success: true,
			message: "Logged in successfully",
			user: {
				id: checkUser._id,
				username: checkUser.username,
				email: checkUser.email,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Some error occurred" });
	}
};

export const logoutUser = (req, res) => {
	res.clearCookie("myCookie");

	res.json({ success: true, message: "Logged out successfully" });
};

export const authMiddleware = async (req, res, next) => {
	try {
		const token = req.cookies.myCookie;
		if (!token) {
			return res.status(401).json({ success: false, message: "Unauthorized" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;

		next();
	} catch (error) {
		res.status(401).json({ success: false, message: "Unauthorized" });
	}
};
