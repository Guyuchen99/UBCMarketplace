import mongoose from "mongoose";

const SavedListSchema = new mongoose.Schema({});

export const SavedList = mongoose.model("SavedList", SavedListSchema);
