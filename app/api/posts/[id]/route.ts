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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const post = await Post.findById(id);
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
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const extraImages = Array.isArray(body.extraImages) ? body.extraImages : [];
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
        title: body.title,
        category: body.category,
        content: body.content,
        thumbnail: body.thumbnail,
        extraImages,
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
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}
