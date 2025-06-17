import mongoose from "mongoose";

const PostingSchema = new mongoose.Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    viewedBy: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Posting = mongoose.model("Posting", PostingSchema);
