import mongoose, { Schema, Document } from "mongoose";
import { POST_CONTENT_WIDTHS, POST_THEMES, POST_TYPOGRAPHY } from "@/lib/post-style";

export interface IPost extends Document {
  title: string;
  slug: string;
  category: string;
  content: string;
  thumbnail: string;
  extraImages: string[];
  excerpt: string;
  tags: string[];
  status: "draft" | "published";
  featured: boolean;
  theme: keyof typeof POST_THEMES;
  contentWidth: keyof typeof POST_CONTENT_WIDTHS;
  fontSize: keyof typeof POST_TYPOGRAPHY.fontSize;
  paragraphSpacing: keyof typeof POST_TYPOGRAPHY.paragraphSpacing;
  lineHeight: keyof typeof POST_TYPOGRAPHY.lineHeight;
  fontFamily: keyof typeof POST_TYPOGRAPHY.fontFamily;
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
    slug: {
      type: String,
      required: [true, "Please provide a post URL slug"],
      trim: true,
      lowercase: true,
      maxlength: 120,
      unique: true,
      sparse: true,
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
    excerpt: {
      type: String,
      default: "",
      maxlength: 160,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      enum: Object.keys(POST_THEMES),
      default: "ocean",
    },
    contentWidth: {
      type: String,
      enum: Object.keys(POST_CONTENT_WIDTHS),
      default: "standard",
    },
    fontSize: {
      type: String,
      enum: Object.keys(POST_TYPOGRAPHY.fontSize),
      default: "medium",
    },
    paragraphSpacing: {
      type: String,
      enum: Object.keys(POST_TYPOGRAPHY.paragraphSpacing),
      default: "comfortable",
    },
    lineHeight: {
      type: String,
      enum: Object.keys(POST_TYPOGRAPHY.lineHeight),
      default: "comfortable",
    },
    fontFamily: {
      type: String,
      enum: Object.keys(POST_TYPOGRAPHY.fontFamily),
      default: "sans",
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
