"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  POST_CONTENT_WIDTHS,
  POST_THEMES,
  POST_TYPOGRAPHY,
  isPostContentWidth,
  isPostFontFamily,
  isPostFontSize,
  isPostLineHeight,
  isPostParagraphSpacing,
  isPostTheme,
  type PostContentWidth,
  type PostFontFamily,
  type PostFontSize,
  type PostLineHeight,
  type PostParagraphSpacing,
  type PostTheme,
} from "@/lib/post-style";

interface PostFormData {
  title: string;
  category: string;
  content: string;
  thumbnail: string;
  extraImages: string[];
  theme: PostTheme;
  contentWidth: PostContentWidth;
  fontSize: PostFontSize;
  paragraphSpacing: PostParagraphSpacing;
  lineHeight: PostLineHeight;
  fontFamily: PostFontFamily;
}

interface PostEditorFormProps {
  postId?: string;
  initialData?: PostFormData;
}

export default function PostEditorForm({ postId, initialData }: PostEditorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [theme, setTheme] = useState<PostTheme>(initialData?.theme ?? "ocean");
  const [contentWidth, setContentWidth] = useState<PostContentWidth>(
    initialData?.contentWidth ?? "standard"
  );
  const [fontSize, setFontSize] = useState<PostFontSize>(initialData?.fontSize ?? "medium");
  const [paragraphSpacing, setParagraphSpacing] = useState<PostParagraphSpacing>(
    initialData?.paragraphSpacing ?? "comfortable"
  );
  const [lineHeight, setLineHeight] = useState<PostLineHeight>(
    initialData?.lineHeight ?? "comfortable"
  );
  const [fontFamily, setFontFamily] = useState<PostFontFamily>(initialData?.fontFamily ?? "sans");
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
        body: JSON.stringify({
          title,
          category,
          content,
          thumbnail,
          extraImages,
          theme,
          contentWidth,
          fontSize,
          paragraphSpacing,
          lineHeight,
          fontFamily,
        }),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(body.error || "Failed to save post.");
      }

      const successMessage = postId ? "Post updated successfully." : "Post created successfully.";
      router.push(`/admin/posts?message=${encodeURIComponent(successMessage)}`);
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGallerySelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = "";
    setError("");
    setGalleryFiles((current) => [...current, ...selectedFiles]);
  };

  return (
    <main className="min-h-screen bg-gm-paper-2 p-4 text-gm-ink sm:p-8">
      <div className="mx-auto max-w-3xl rounded-lg border border-gm-paper-2 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-8 flex items-center justify-between border-b border-gm-paper-2 pb-4">
          <h1 className="text-2xl font-bold text-gm-ink">
            {postId ? "Edit Post" : "Create New Post"}
          </h1>
          <Link href="/admin/posts" className="text-sm text-gm-green-dark hover:text-gm-maroon">
            Cancel
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="post-title" className="block text-sm font-medium text-gm-ink/80">
              Title / Heading
            </label>
            <input
              id="post-title"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gm-paper-2 p-2 text-sm shadow-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
            />
          </div>

          <div>
            <label htmlFor="post-category" className="block text-sm font-medium text-gm-ink/80">
              Category
            </label>
            <input
              id="post-category"
              required
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gm-paper-2 p-2 text-sm shadow-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
            />
          </div>

          <div>
            <label htmlFor="post-content" className="block text-sm font-medium text-gm-ink/80">
              Content (HTML/Text)
            </label>
            <textarea
              id="post-content"
              required
              rows={8}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gm-paper-2 p-2 text-sm shadow-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
              placeholder="Write your post content here."
            />
          </div>

          <section className="space-y-4 rounded-2xl border border-gm-paper-2 bg-gm-paper-2 p-5">
            <div>
              <h2 className="text-base font-semibold text-gm-ink">Post appearance</h2>
              <p className="mt-1 text-sm text-gm-ink/60">
                Choose an accent theme and reading width for this post.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label htmlFor="post-theme" className="block text-sm font-medium text-gm-ink/80">
                Accent theme
                <select
                  id="post-theme"
                  value={theme}
                  onChange={(event) => {
                    if (isPostTheme(event.target.value)) setTheme(event.target.value);
                  }}
                  className="mt-1 w-full rounded-md border border-gm-paper-2 bg-white p-2 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
                >
                  {Object.entries(POST_THEMES).map(([key, option]) => (
                    <option key={key} value={key}>{option.label}</option>
                  ))}
                </select>
              </label>

              <label htmlFor="post-content-width" className="block text-sm font-medium text-gm-ink/80">
                Article width
                <select
                  id="post-content-width"
                  value={contentWidth}
                  onChange={(event) => {
                    if (isPostContentWidth(event.target.value)) setContentWidth(event.target.value);
                  }}
                  className="mt-1 w-full rounded-md border border-gm-paper-2 bg-white p-2 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
                >
                  {Object.entries(POST_CONTENT_WIDTHS).map(([key, option]) => (
                    <option key={key} value={key}>{option.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className={`rounded-xl bg-gradient-to-br ${POST_THEMES[theme].hero} p-4`}>
              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${POST_THEMES[theme].badge}`}>
                {POST_THEMES[theme].label}
              </span>
              <p className={`mt-3 text-lg font-bold ${POST_THEMES[theme].accent}`}>
                Appearance preview
              </p>
              <p className="mt-1 text-sm text-gm-ink/60">
                {POST_CONTENT_WIDTHS[contentWidth].label}
              </p>
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-gm-paper-2 bg-gm-paper-2 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-gm-ink">Typography</h2>
                  <p className="mt-1 text-sm text-gm-ink/60">
                  Customize this post&apos;s reading experience. Preview updates as you edit.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFontSize("medium");
                  setParagraphSpacing("comfortable");
                  setLineHeight("comfortable");
                  setFontFamily("sans");
                }}
                className="text-sm font-medium text-gm-green hover:text-gm-green-dark"
              >
                Reset typography
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label htmlFor="post-font-size" className="block text-sm font-medium text-gm-ink/80">
                Body font size
                <select
                  id="post-font-size"
                  value={fontSize}
                  onChange={(event) => {
                    if (isPostFontSize(event.target.value)) setFontSize(event.target.value);
                  }}
                  className="mt-1 w-full rounded-md border border-gm-paper-2 bg-white p-2 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
                >
                  {Object.entries(POST_TYPOGRAPHY.fontSize).map(([key, option]) => (
                    <option key={key} value={key}>{option.label}</option>
                  ))}
                </select>
              </label>

              <label htmlFor="post-paragraph-spacing" className="block text-sm font-medium text-gm-ink/80">
                Paragraph spacing
                <select
                  id="post-paragraph-spacing"
                  value={paragraphSpacing}
                  onChange={(event) => {
                    if (isPostParagraphSpacing(event.target.value)) setParagraphSpacing(event.target.value);
                  }}
                  className="mt-1 w-full rounded-md border border-gm-paper-2 bg-white p-2 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
                >
                  {Object.entries(POST_TYPOGRAPHY.paragraphSpacing).map(([key, option]) => (
                    <option key={key} value={key}>{option.label}</option>
                  ))}
                </select>
              </label>

              <label htmlFor="post-line-height" className="block text-sm font-medium text-gm-ink/80">
                Line height
                <select
                  id="post-line-height"
                  value={lineHeight}
                  onChange={(event) => {
                    if (isPostLineHeight(event.target.value)) setLineHeight(event.target.value);
                  }}
                  className="mt-1 w-full rounded-md border border-gm-paper-2 bg-white p-2 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
                >
                  {Object.entries(POST_TYPOGRAPHY.lineHeight).map(([key, option]) => (
                    <option key={key} value={key}>{option.label}</option>
                  ))}
                </select>
              </label>

              <label htmlFor="post-font-family" className="block text-sm font-medium text-gm-ink/80">
                Font style
                <select
                  id="post-font-family"
                  value={fontFamily}
                  onChange={(event) => {
                    if (isPostFontFamily(event.target.value)) setFontFamily(event.target.value);
                  }}
                  className="mt-1 w-full rounded-md border border-gm-paper-2 bg-white p-2 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
                >
                  {Object.entries(POST_TYPOGRAPHY.fontFamily).map(([key, option]) => (
                    <option key={key} value={key}>{option.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <div
              aria-label="Typography preview"
              className={`rounded-xl border border-gm-paper-2 bg-white p-5 text-gm-ink/80 ${POST_TYPOGRAPHY.fontSize[fontSize].className} ${POST_TYPOGRAPHY.fontFamily[fontFamily].className} ${POST_TYPOGRAPHY.paragraphSpacing[paragraphSpacing].className} ${POST_TYPOGRAPHY.lineHeight[lineHeight].className}`}
            >
              <h3 className="mb-3 text-lg font-bold text-gm-ink">Preview your post text</h3>
              <p className="mb-4">
                This preview shows how the selected font style, size, line height, and paragraph
                spacing will appear to readers.
              </p>
              <p>
                These controls are saved with this post only. Other posts keep their own
                typography settings.
              </p>
            </div>
          </section>

          <section className="space-y-4 border-t border-gm-paper-2 pt-6">
            <div>
              <h2 className="text-base font-semibold text-gm-ink">Cover Photos</h2>
              <p className="mt-1 text-sm text-gm-ink/60">
                Add one main cover photo and as many gallery photos as you need.
              </p>
            </div>

            <div>
              <label htmlFor="post-thumbnail" className="block text-sm font-medium text-gm-ink/80">
                Main cover photo
              </label>
              {initialData?.thumbnail && !thumbnailFile && (
                <div className="relative mt-2 aspect-[16/9] max-w-lg overflow-hidden rounded-md bg-gm-paper-2">
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
                className="mt-2 block w-full text-sm text-gm-ink/70 file:mr-4 file:rounded-md file:border-0 file:bg-gm-paper-2 file:px-4 file:py-2 file:font-medium hover:file:bg-gm-paper-2/70"
              />
              {thumbnailFile && <p className="mt-2 text-sm text-gm-ink/60">Selected: {thumbnailFile.name}</p>}
            </div>

            <div>
              <label htmlFor="post-gallery" className="block text-sm font-medium text-gm-ink/80">
                Gallery photos ({galleryImages.length + galleryFiles.length})
              </label>
              {(galleryImages.length > 0 || galleryFiles.length > 0) && (
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {galleryImages.map((image, index) => (
                    <div key={`${image}-${index}`}>
                      <div className="relative aspect-square overflow-hidden rounded-md bg-gm-paper-2">
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
                      <div className="flex aspect-square items-center justify-center rounded-md bg-gm-paper-2 p-2 text-center text-xs text-gm-ink/70">
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
                onChange={handleGallerySelection}
                className="mt-3 block w-full text-sm text-gm-ink/70 file:mr-4 file:rounded-md file:border-0 file:bg-gm-paper-2 file:px-4 file:py-2 file:font-medium hover:file:bg-gm-paper-2/70"
              />
            </div>
          </section>

          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-gm-maroon px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gm-maroon-dark disabled:opacity-50"
          >
            {loading ? "Saving post..." : postId ? "Save Changes" : "Publish Post"}
          </button>
        </form>
      </div>
    </main>
  );
}