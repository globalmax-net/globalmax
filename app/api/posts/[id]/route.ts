import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import { sanitizePostContent } from "@/lib/post-content";
import { normalizePostMetadata } from "@/lib/post-metadata";
import {
  isPostContentWidth,
  isPostFontFamily,
  isPostFontSize,
  isPostLineHeight,
  isPostParagraphSpacing,
  isPostTheme,
} from "@/lib/post-style";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const session = await getSession();
    const { id } = await params;
    const post =
      (await Post.findOne({
        slug: id,
        ...(session ? {} : { status: { $ne: "draft" } }),
      })) ??
      (mongoose.isValidObjectId(id)
        ? await Post.findOne({
            _id: id,
            ...(session ? {} : { status: { $ne: "draft" } }),
          })
        : null);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await getSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const { id } = await params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await getSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid post data." }, { status: 400 });
    }
    const extraImages = Array.isArray(body.extraImages) ? body.extraImages : [];
    const metadata = normalizePostMetadata(body, "published");
    if (
      !metadata ||
      typeof body.category !== "string" ||
      !body.category.trim() ||
      typeof body.thumbnail !== "string" ||
      !body.thumbnail ||
      typeof body.content !== "string" ||
      !body.content.trim()
    ) {
      return NextResponse.json({ error: "Check the post title, slug, excerpt, and publishing status." }, { status: 400 });
    }
    const theme = body.theme === undefined ? "ocean" : body.theme;
    const contentWidth = body.contentWidth === undefined ? "standard" : body.contentWidth;
    const fontSize = body.fontSize === undefined ? "medium" : body.fontSize;
    const paragraphSpacing = body.paragraphSpacing === undefined ? "comfortable" : body.paragraphSpacing;
    const lineHeight = body.lineHeight === undefined ? "comfortable" : body.lineHeight;
    const fontFamily = body.fontFamily === undefined ? "sans" : body.fontFamily;

    if (
      !isPostTheme(theme) ||
      !isPostContentWidth(contentWidth) ||
      !isPostFontSize(fontSize) ||
      !isPostParagraphSpacing(paragraphSpacing) ||
      !isPostLineHeight(lineHeight) ||
      !isPostFontFamily(fontFamily)
    ) {
      return NextResponse.json({ error: "Choose a supported post style." }, { status: 400 });
    }

    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...metadata,
        category: body.category.trim(),
        content: sanitizePostContent(body.content),
        thumbnail: body.thumbnail,
        extraImages: extraImages.filter((image: unknown): image is string => typeof image === "string"),
        theme,
        contentWidth,
        fontSize,
        paragraphSpacing,
        lineHeight,
        fontFamily,
      },
      { new: true, runValidators: true }
    );

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Failed to update post:", error);
    if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
      return NextResponse.json({ error: "That post URL slug is already in use." }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}
