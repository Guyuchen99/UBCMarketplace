import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({});

export const Product = mongoose.model("Product", ProductSchema);
