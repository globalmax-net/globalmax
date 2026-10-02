"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PostFormData {
  title: string;
  category: string;
  content: string;
  thumbnail: string;
  extraImages: string[];
}

interface PostEditorFormProps {
  postId?: string;
  initialData?: PostFormData;
}

const MAX_GALLERY_IMAGES = 4;

export default function PostEditorForm({ postId, initialData }: PostEditorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState(initialData?.extraImages ?? []);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const uploadImages = async (files: File[]) => {
    if (files.length === 0) return [];

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));
    const response = await fetch("/api/upload", { method: "POST", body: formData });
    const body = (await response.json().catch(() => ({}))) as {
      urls?: unknown;
      error?: string;
    };

    if (
      !response.ok ||
      !Array.isArray(body.urls) ||
      body.urls.length !== files.length ||
      body.urls.some((url) => typeof url !== "string")
    ) {
      throw new Error(body.error || "Image upload failed.");
    }

    return body.urls as string[];
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!thumbnailFile && !initialData?.thumbnail) {
      setError("Choose a main cover photo before publishing.");
      return;
    }

    if (galleryImages.length + galleryFiles.length > MAX_GALLERY_IMAGES) {
      setError(`A post can have one cover photo and up to ${MAX_GALLERY_IMAGES} gallery photos.`);
      return;
    }

    setLoading(true);
    try {
      const filesToUpload = [...(thumbnailFile ? [thumbnailFile] : []), ...galleryFiles];
      const uploadedUrls = await uploadImages(filesToUpload);
      let uploadIndex = 0;
      const thumbnail = thumbnailFile
        ? uploadedUrls[uploadIndex++]
        : initialData?.thumbnail ?? "";
      const extraImages = [...galleryImages, ...uploadedUrls.slice(uploadIndex)];

      const response = await fetch(postId ? `/api/posts/${postId}` : "/api/posts", {
        method: postId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, content, thumbnail, extraImages }),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(body.error || "Failed to save post.");
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGallerySelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.currentTarget.files ?? []);
    const availableSlots = Math.max(0, MAX_GALLERY_IMAGES - galleryImages.length);
    event.currentTarget.value = "";

    if (selectedFiles.length > availableSlots) {
      setError(`You can add up to ${availableSlots} more gallery photo(s).`);
    } else {
      setError("");
    }
    setGalleryFiles(selectedFiles.slice(0, availableSlots));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-8 flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {postId ? "Edit Post" : "Create New Post"}
          </h1>
          <Link href="/admin/posts" className="text-sm text-gray-500 hover:text-gray-900">
            Cancel
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="post-title" className="block text-sm font-medium text-gray-700">
              Title / Heading
            </label>
            <input
              id="post-title"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="post-category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              id="post-category"
              required
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="post-content" className="block text-sm font-medium text-gray-700">
              Content (HTML/Text)
            </label>
            <textarea
              id="post-content"
              required
              rows={8}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-black focus:ring-black"
              placeholder="Write your post content here."
            />
          </div>

          <section className="space-y-4 border-t border-gray-200 pt-6">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Cover Photos</h2>
              <p className="mt-1 text-sm text-gray-500">
                Add one main cover photo and up to four gallery photos.
              </p>
            </div>

            <div>
              <label htmlFor="post-thumbnail" className="block text-sm font-medium text-gray-700">
                Main cover photo
              </label>
              {initialData?.thumbnail && !thumbnailFile && (
                <div className="relative mt-2 aspect-[16/9] max-w-lg overflow-hidden rounded-md bg-gray-100">
                  <Image
                    src={initialData.thumbnail}
                    alt="Current cover photo"
                    fill
                    sizes="(max-width: 640px) 100vw, 512px"
                    className="object-cover"
                  />
                </div>
              )}
              <input
                id="post-thumbnail"
                type="file"
                accept="image/*"
                required={!initialData?.thumbnail}
                onChange={(event) => setThumbnailFile(event.target.files?.[0] ?? null)}
                className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:font-medium hover:file:bg-gray-200"
              />
              {thumbnailFile && <p className="mt-2 text-sm text-gray-500">Selected: {thumbnailFile.name}</p>}
            </div>

            <div>
              <label htmlFor="post-gallery" className="block text-sm font-medium text-gray-700">
                Gallery photos ({galleryImages.length + galleryFiles.length}/4)
              </label>
              {(galleryImages.length > 0 || galleryFiles.length > 0) && (
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {galleryImages.map((image, index) => (
                    <div key={`${image}-${index}`}>
                      <div className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
                        <Image
                          src={image}
                          alt={`Gallery photo ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, 160px"
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setGalleryImages((current) => current.filter((_, i) => i !== index))}
                        className="mt-1 text-xs text-red-700 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {galleryFiles.map((file, index) => (
                    <div key={`${file.name}-${file.lastModified}`} className="min-w-0">
                      <div className="flex aspect-square items-center justify-center rounded-md bg-gray-100 p-2 text-center text-xs text-gray-600">
                        {file.name}
                      </div>
                      <button
                        type="button"
                        onClick={() => setGalleryFiles((current) => current.filter((_, i) => i !== index))}
                        className="mt-1 text-xs text-red-700 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <input
                id="post-gallery"
                type="file"
                accept="image/*"
                multiple
                disabled={galleryImages.length >= MAX_GALLERY_IMAGES}
                onChange={handleGallerySelection}
                className="mt-3 block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:font-medium hover:file:bg-gray-200 disabled:opacity-50"
              />
            </div>
          </section>

          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Saving post..." : postId ? "Save Changes" : "Publish Post"}
          </button>
        </form>
      </div>
    </main>
  );
}