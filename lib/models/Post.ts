import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  category: string;
  content: string;
  thumbnail: string;
  extraImages: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Please provide a post title"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please provide post content"],
    },
    thumbnail: {
      type: String,
      required: [true, "Please provide a thumbnail image"],
    },
    extraImages: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;

