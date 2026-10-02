import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  debug: process.env.NODE_ENV !== "production",
  hide_sensitive: true,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }
    if (files.length > 5) {
      return NextResponse.json(
        { error: "A maximum of five photos can be uploaded for one post." },
        { status: 400 }
      );
    }

    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "globalmax_posts" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result?.secure_url as string);
          }
        );
        uploadStream.end(buffer);
      });
    });

    const urls = await Promise.all(uploadPromises);
    return NextResponse.json({ urls }, { status: 200 });
  } catch (error) {
    const uploadError = error as {
      message?: string;
      http_code?: number;
      request_id?: string;
    };
    console.error("Cloudinary upload failed:", {
      message: uploadError.message,
      http_code: uploadError.http_code,
      request_id: uploadError.request_id,
    });
    const message = uploadError.http_code === 403
      ? "Cloudinary rejected the upload (403). Verify the cloud name, API key, and API secret are from the same account, and that uploads are enabled."
      : "Failed to upload to Cloudinary.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
