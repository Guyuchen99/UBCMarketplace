import mongoose from "mongoose";

const PostingSchema = new mongoose.Schema({});

export const Posting = mongoose.model("Posting", PostingSchema);
