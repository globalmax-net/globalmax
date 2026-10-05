import { NextRequest, NextResponse } from "next/server";
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

export async function POST(req: NextRequest) {
  try {
    if (!(await getSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid post data." }, { status: 400 });
    }
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
    const newPost = await Post.create({
      ...metadata,
      category: body.category.trim(),
      content: sanitizePostContent(typeof body.content === "string" ? body.content : ""),
      thumbnail: body.thumbnail,
      extraImages: Array.isArray(body.extraImages)
        ? body.extraImages.filter((image: unknown): image is string => typeof image === "string")
        : [],
      theme,
      contentWidth,
      fontSize,
      paragraphSpacing,
      lineHeight,
      fontFamily,
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
      return NextResponse.json({ error: "That post URL slug is already in use." }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const session = await getSession();
    const posts = await Post.find(
      session ? {} : { status: { $ne: "draft" } }
    ).sort({ createdAt: -1 });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
