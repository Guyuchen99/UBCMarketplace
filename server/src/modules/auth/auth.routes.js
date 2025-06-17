import express from "express";
import {
  authMiddleware,
  deleteAccount,
  deleteUserForAdmin,
  getProfile,
  isAdminMiddleware,
  loginUser,
  logoutUser,
  registerUser,
  updateAccount,
  updateUserForAdmin,
} from "./auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

authRouter.get("/me", authMiddleware, getProfile);
authRouter.put("/me", authMiddleware, updateAccount);
authRouter.delete("/me", authMiddleware, deleteAccount);

authRouter.put("/update/:id", authMiddleware, isAdminMiddleware, updateUserForAdmin);
authRouter.delete("/delete/:id", authMiddleware, isAdminMiddleware, deleteUserForAdmin);
