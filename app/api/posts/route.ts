import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    if (Array.isArray(body.extraImages) && body.extraImages.length > 4) {
      return NextResponse.json(
        { error: "A post can have up to four gallery photos." },
        { status: 400 }
      );
    }
    const newPost = await Post.create(body);
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
