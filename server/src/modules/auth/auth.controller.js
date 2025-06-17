import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "./auth.model.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.json({ success: false, message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
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

    const token = jwt.sign({ _id: checkUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("myCookie", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ success: true, message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("myCookie");

  res.json({ success: true, message: "Logged out successfully" });
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

export const updateAccount = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userId = req.userId;

    const updateData = {};

    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        return res.json({ success: false, message: "Email already registered" });
      }
      updateData.email = email;
    }

    if (username) {
      const usernameExists = await User.findOne({ username, _id: { $ne: userId } });
      if (usernameExists) {
        return res.json({ success: false, message: "Username taken" });
      }
      updateData.username = username;
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 12);
    }

    await User.findByIdAndUpdate(userId, updateData);

    res.json({ success: true, message: "Account updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.userId;

    await User.findByIdAndDelete(userId);

    res.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

export const updateUserForAdmin = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userId = req.params.id;

    const updateData = {};

    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        return res.json({ success: false, message: "Email already registered" });
      }
      updateData.email = email;
    }

    if (username) {
      const usernameExists = await User.findOne({ username, _id: { $ne: userId } });
      if (usernameExists) {
        return res.json({ success: false, message: "Username taken" });
      }
      updateData.username = username;
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 12);
    }

    if (role) {
      updateData.role = role;
    }

    await User.findByIdAndUpdate(userId, updateData);

    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

export const deleteUserForAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.myCookie;
    if (!token) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export const isAdminMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");
    if (!user || user?.role != "admin") {
      return res.json({ success: false, message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
