import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
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
    await connectDB();
    const body = await req.json();
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
      title: body.title,
      category: body.category,
      content: body.content,
      thumbnail: body.thumbnail,
      extraImages: body.extraImages,
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
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
