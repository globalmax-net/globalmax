"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
import { createPostSlug } from "@/lib/post-metadata";
import { sanitizePostPreview } from "@/lib/post-preview";

interface PostFormData {
  title: string;
  category: string;
  content: string;
  thumbnail: string;
  extraImages: string[];

  excerpt?: string;
  tags?: string[];
  slug?: string;
  status?: "draft" | "published";
  featured?: boolean;

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

export default function PostEditorForm({
  postId,
  initialData,
}: PostEditorFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");

  const [slug, setSlug] = useState(
    initialData?.slug ?? createPostSlug(initialData?.title ?? "")
  );

  const [tags, setTags] = useState<string[]>(
    initialData?.tags ?? []
  );

  const [tagInput, setTagInput] = useState("");

  const [status, setStatus] = useState<"draft" | "published">(
    initialData?.status ?? "draft"
  );

  const [featured, setFeatured] = useState(
    initialData?.featured ?? false
  );

  const [wordCount, setWordCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState("");

  const editorRef = useRef<HTMLDivElement>(null);
  const savedSelectionRef = useRef<Range | null>(null);

  const [theme, setTheme] = useState<PostTheme>(
    initialData?.theme ?? "ocean"
  );

  const [contentWidth, setContentWidth] =
    useState<PostContentWidth>(
      initialData?.contentWidth ?? "standard"
    );

  const [fontSize, setFontSize] =
    useState<PostFontSize>(
      initialData?.fontSize ?? "medium"
    );

  const [paragraphSpacing, setParagraphSpacing] =
    useState<PostParagraphSpacing>(
      initialData?.paragraphSpacing ?? "comfortable"
    );

  const [lineHeight, setLineHeight] =
    useState<PostLineHeight>(
      initialData?.lineHeight ?? "comfortable"
    );

  const [fontFamily, setFontFamily] =
    useState<PostFontFamily>(
      initialData?.fontFamily ?? "sans"
    );

  const [thumbnailFile, setThumbnailFile] =
    useState<File | null>(null);

  const [galleryImages, setGalleryImages] =
    useState(initialData?.extraImages ?? []);

  const [galleryFiles, setGalleryFiles] =
    useState<File[]>([]);

  const uploadImages = async (files: File[]) => {
    if (files.length === 0) return [];

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("file", file);
    });

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

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
      throw new Error(
        body.error || "Image upload failed."
      );
    }

    return body.urls as string[];
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);

    if (!postId) {
      setSlug(createPostSlug(value));
    }
  };

  const getWordCount = () => {
    const text =
      editorRef.current?.textContent?.trim() ?? "";

    if (!text) return 0;

    return text
      .split(/\s+/)
      .filter(Boolean)
      .length;
  };

  const updateWordCount = () => {
    setWordCount(getWordCount());
  };

  useEffect(() => {
    updateWordCount();
  }, []);

  const addTag = () => {
    const tag = tagInput.trim();

    if (!tag) return;

    const alreadyExists = tags.some(
      (item) =>
        item.toLowerCase() === tag.toLowerCase()
    );

    if (!alreadyExists) {
      setTags((current) => [...current, tag]);
    }

    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags((current) =>
      current.filter((item) => item !== tag)
    );
  };

  const handleTagKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "Enter" ||
      event.key === ","
    ) {
      event.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const content =
      editorRef.current?.innerHTML ?? "";

    if (!editorRef.current?.textContent?.trim()) {
      setError(
        "Write some post content before publishing."
      );
      return;
    }

    if (!thumbnailFile && !initialData?.thumbnail) {
      setError(
        "Choose a main cover photo before publishing."
      );
      return;
    }

    if (!title.trim()) {
      setError("Please enter a post title.");
      return;
    }

    if (!category.trim()) {
      setError("Please enter a category.");
      return;
    }

    setLoading(true);

    try {
      const filesToUpload = [
        ...(thumbnailFile ? [thumbnailFile] : []),
        ...galleryFiles,
      ];

      const uploadedUrls =
        await uploadImages(filesToUpload);

      let uploadIndex = 0;

      const thumbnail = thumbnailFile
        ? uploadedUrls[uploadIndex++]
        : initialData?.thumbnail ?? "";

      const extraImages = [
        ...galleryImages,
        ...uploadedUrls.slice(uploadIndex),
      ];

      const response = await fetch(
        postId
          ? `/api/posts/${postId}`
          : "/api/posts",
        {
          method: postId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            category,
            content,
            thumbnail,
            extraImages,

            excerpt,
            tags,
            slug,
            status,
            featured,

            theme,
            contentWidth,
            fontSize,
            paragraphSpacing,
            lineHeight,
            fontFamily,
          }),
        }
      );

      const body =
        (await response.json().catch(() => ({}))) as {
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          body.error || "Failed to save post."
        );
      }

      const successMessage = postId
        ? "Post updated successfully."
        : status === "published"
          ? "Post published successfully."
          : "Post saved as draft.";

      router.push(
        `/admin/posts?message=${encodeURIComponent(
          successMessage
        )}`
      );

      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGallerySelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(
      event.currentTarget.files ?? []
    );

    event.currentTarget.value = "";

    setError("");

    setGalleryFiles((current) => [
      ...current,
      ...selectedFiles,
    ]);
  };

  const runEditorCommand = (
    command: string,
    value?: string
  ) => {
    const editor = editorRef.current;

    if (!editor) return;

    editor.focus();

    const selection = window.getSelection();
    const savedSelection =
      savedSelectionRef.current;

    if (
      selection &&
      savedSelection &&
      editor.contains(
        savedSelection.commonAncestorContainer
      )
    ) {
      selection.removeAllRanges();
      selection.addRange(savedSelection);
    }

    const commandValue =
      command === "formatBlock" && value
        ? `<${value}>`
        : value;

    document.execCommand(
      command,
      false,
      commandValue
    );

    saveEditorSelection();
    updateWordCount();
  };

  const saveEditorSelection = () => {
    const editor = editorRef.current;
    const selection = window.getSelection();

    const range = selection?.rangeCount
      ? selection.getRangeAt(0)
      : null;

    if (
      editor &&
      range &&
      editor.contains(range.commonAncestorContainer)
    ) {
      savedSelectionRef.current =
        range.cloneRange();
    }
  };

  const insertLink = () => {
    const url = window.prompt(
      "Enter a web address or email link:"
    );

    if (!url) return;

    try {
      const parsedUrl = new URL(url);

      if (
        !["http:", "https:", "mailto:"].includes(
          parsedUrl.protocol
        )
      ) {
        throw new Error("Unsupported link type");
      }
    } catch {
      setError(
        "Enter a valid web address or email link."
      );
      return;
    }

    setError("");

    runEditorCommand("createLink", url);
  };

  const readingTime = Math.max(
    1,
    Math.ceil(wordCount / 200)
  );

  return (
    <main className="min-h-screen bg-gm-paper-2 p-4 text-gm-ink sm:p-8">
      <div className="mx-auto max-w-4xl rounded-lg border border-gm-paper-2 bg-white p-5 shadow-sm sm:p-8">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between border-b border-gm-paper-2 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gm-ink">
              {postId
                ? "Edit Post"
                : "Create New Post"}
            </h1>

            <p className="mt-1 text-sm text-gm-ink/50">
              Create and manage your blog article.
            </p>
          </div>

          <Link
            href="/admin/posts"
            className="text-sm text-gm-green-dark hover:text-gm-maroon"
          >
            Cancel
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* BASIC INFORMATION */}
          <section className="space-y-5 rounded-2xl border border-gm-paper-2 bg-gm-paper-2 p-5">
            <div>
              <h2 className="text-base font-semibold">
                Post Information
              </h2>

              <p className="mt-1 text-sm text-gm-ink/60">
                Add the basic information for your article.
              </p>
            </div>

            {/* TITLE */}
            <div>
              <label
                htmlFor="post-title"
                className="block text-sm font-medium text-gm-ink/80"
              >
                Title
              </label>

              <input
                id="post-title"
                required
                value={title}
                onChange={(event) =>
                  handleTitleChange(
                    event.target.value
                  )
                }
                placeholder="Enter your post title"
                className="mt-1 block w-full rounded-md border border-gm-paper-2 p-3 text-sm shadow-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
              />
            </div>

            {/* SLUG */}
            <div>
              <label
                htmlFor="post-slug"
                className="block text-sm font-medium text-gm-ink/80"
              >
                URL Slug
              </label>

              <input
                id="post-slug"
                required
                value={slug}
                onChange={(event) =>
                  setSlug(createPostSlug(event.target.value))
                }
                placeholder="my-first-blog-post"
                className="mt-1 block w-full rounded-md border border-gm-paper-2 p-3 text-sm shadow-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
              />

              <p className="mt-1 text-xs text-gm-ink/50">
                /post/{slug || "my-first-blog-post"}
              </p>
            </div>

            {/* CATEGORY */}
            <div>
              <label
                htmlFor="post-category"
                className="block text-sm font-medium text-gm-ink/80"
              >
                Category
              </label>

              <input
                id="post-category"
                required
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                placeholder="Technology"
                className="mt-1 block w-full rounded-md border border-gm-paper-2 p-3 text-sm shadow-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
              />
            </div>

            {/* EXCERPT */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="post-excerpt"
                  className="block text-sm font-medium text-gm-ink/80"
                >
                  Short Description
                </label>

                <span className="text-xs text-gm-ink/50">
                  {excerpt.length}/160
                </span>
              </div>

              <textarea
                id="post-excerpt"
                value={excerpt}
                maxLength={160}
                rows={3}
                onChange={(event) =>
                  setExcerpt(event.target.value)
                }
                placeholder="Write a short description of your post..."
                className="mt-1 block w-full rounded-md border border-gm-paper-2 p-3 text-sm shadow-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
              />
            </div>

            {/* TAGS */}
            <div>
              <label className="block text-sm font-medium text-gm-ink/80">
                Tags
              </label>

              <div className="mt-1 flex gap-2">
                <input
                  value={tagInput}
                  onChange={(event) =>
                    setTagInput(
                      event.target.value
                    )
                  }
                  onKeyDown={
                    handleTagKeyDown
                  }
                  placeholder="Next.js, React, DevOps..."
                  className="flex-1 rounded-md border border-gm-paper-2 p-3 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
                />

                <button
                  type="button"
                  onClick={addTag}
                  className="rounded-md bg-gm-green px-4 py-2 text-sm font-medium text-white hover:bg-gm-green-dark"
                >
                  Add
                </button>
              </div>

              {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-sm"
                    >
                      #{tag}

                      <button
                        type="button"
                        onClick={() =>
                          removeTag(tag)
                        }
                        className="font-bold text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* CONTENT EDITOR */}
          <section>
            <div className="flex items-center justify-between gap-3">
              <label
                id="post-content-label"
                className="block text-sm font-medium text-gm-ink/80"
              >
                Post Content
              </label>

              <p className="text-xs text-gm-ink/60">
                Enter creates a paragraph. Shift+Enter
                creates a line break.
              </p>
            </div>

            <div
              role="toolbar"
              aria-label="Post content formatting"
              className="mt-2 flex flex-wrap gap-1 rounded-t-md border border-b-0 border-gm-paper-2 bg-gm-paper-2 p-2"
            >
              {[
                {
                  label: "Bold",
                  command: "bold",
                  display: "B",
                  className: "font-bold",
                },
                {
                  label: "Italic",
                  command: "italic",
                  display: "I",
                  className: "italic",
                },
                {
                  label: "Underline",
                  command: "underline",
                  display: "U",
                  className: "underline",
                },
                {
                  label: "Highlight",
                  command: "hiliteColor",
                  value: "#fef08a",
                  display: "Highlight",
                },
                {
                  label: "Heading 2",
                  command: "formatBlock",
                  value: "h2",
                  display: "H2",
                },
                {
                  label: "Heading 3",
                  command: "formatBlock",
                  value: "h3",
                  display: "H3",
                },
                {
                  label: "Paragraph",
                  command: "formatBlock",
                  value: "p",
                  display: "Paragraph",
                },
                {
                  label: "Bulleted list",
                  command:
                    "insertUnorderedList",
                  display: "Bullets",
                },
                {
                  label: "Numbered list",
                  command:
                    "insertOrderedList",
                  display: "Numbering",
                },
                {
                  label: "Quote",
                  command: "formatBlock",
                  value: "blockquote",
                  display: "Quote",
                },
              ].map(
                ({
                  label,
                  command,
                  value,
                  display,
                  className,
                }) => (
                  <button
                    key={label}
                    type="button"
                    title={label}
                    aria-label={label}
                    onMouseDown={(event) =>
                      event.preventDefault()
                    }
                    onMouseUp={
                      saveEditorSelection
                    }
                    onClick={() =>
                      runEditorCommand(
                        command,
                        value
                      )
                    }
                    className={`rounded border border-gm-paper-2 bg-white px-2 py-1 text-xs text-gm-ink hover:border-gm-green ${
                      className ?? ""
                    }`}
                  >
                    {display}
                  </button>
                )
              )}

              <button
                type="button"
                aria-label="Link"
                onMouseDown={(event) =>
                  event.preventDefault()
                }
                onMouseUp={saveEditorSelection}
                onClick={insertLink}
                className="rounded border border-gm-paper-2 bg-white px-2 py-1 text-xs text-gm-ink hover:border-gm-green"
              >
                Link
              </button>

              <button
                type="button"
                aria-label="Clear"
                onMouseDown={(event) =>
                  event.preventDefault()
                }
                onMouseUp={saveEditorSelection}
                onClick={() =>
                  runEditorCommand(
                    "removeFormat"
                  )
                }
                className="rounded border border-gm-paper-2 bg-white px-2 py-1 text-xs text-gm-ink hover:border-gm-green"
              >
                Clear
              </button>
            </div>

            <div
              ref={editorRef}
              id="post-content"
              role="textbox"
              aria-labelledby="post-content-label"
              aria-multiline="true"
              contentEditable
              suppressContentEditableWarning
              onMouseUp={saveEditorSelection}
              onKeyUp={() => {
                saveEditorSelection();
                updateWordCount();
              }}
              onInput={() => {
                saveEditorSelection();
                updateWordCount();
              }}
              dangerouslySetInnerHTML={{
                __html:
                  initialData?.content ?? "",
              }}
              className="prose prose-sm mt-0 min-h-72 max-w-none rounded-b-md border border-gm-paper-2 p-4 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
            />

            {/* ARTICLE STATS */}
            <div className="flex flex-wrap gap-5 border-x border-b border-gm-paper-2 bg-gm-paper-2 px-4 py-3 text-xs text-gm-ink/60">
              <span>
                <strong className="text-gm-ink">
                  {wordCount}
                </strong>{" "}
                words
              </span>

              <span>
                <strong className="text-gm-ink">
                  {readingTime}
                </strong>{" "}
                min read
              </span>
            </div>
          </section>

          {/* PUBLISHING */}
          <section className="space-y-4 rounded-2xl border border-gm-paper-2 bg-gm-paper-2 p-5">
            <div>
              <h2 className="text-base font-semibold">
                Publishing
              </h2>

              <p className="mt-1 text-sm text-gm-ink/60">
                Control how this post appears on your blog.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-gm-ink/80">
                Status

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target
                        .value as
                        | "draft"
                        | "published"
                    )
                  }
                  className="mt-1 w-full rounded-md border border-gm-paper-2 bg-white p-3 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
                >
                  <option value="draft">
                    Draft
                  </option>

                  <option value="published">
                    Published
                  </option>
                </select>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-md border border-gm-paper-2 bg-white p-3">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) =>
                    setFeatured(
                      event.target.checked
                    )
                  }
                  className="h-4 w-4"
                />

                <div>
                  <p className="text-sm font-medium">
                    Featured Post
                  </p>

                  <p className="text-xs text-gm-ink/50">
                    Highlight this post on your blog.
                  </p>
                </div>
              </label>
            </div>
          </section>

          {/* APPEARANCE */}
          <section className="space-y-4 rounded-2xl border border-gm-paper-2 bg-gm-paper-2 p-5">
            <div>
              <h2 className="text-base font-semibold">
                Post Appearance
              </h2>

              <p className="mt-1 text-sm text-gm-ink/60">
                Customize the reading experience.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Accent Theme

                <select
                  value={theme}
                  onChange={(event) => {
                    if (
                      isPostTheme(
                        event.target.value
                      )
                    ) {
                      setTheme(
                        event.target.value
                      );
                    }
                  }}
                  className="mt-1 w-full rounded-md border border-gm-paper-2 bg-white p-2 text-sm"
                >
                  {Object.entries(
                    POST_THEMES
                  ).map(([key, option]) => (
                    <option
                      key={key}
                      value={key}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium">
                Article Width

                <select
                  value={contentWidth}
                  onChange={(event) => {
                    if (
                      isPostContentWidth(
                        event.target.value
                      )
                    ) {
                      setContentWidth(
                        event.target.value
                      );
                    }
                  }}
                  className="mt-1 w-full rounded-md border border-gm-paper-2 bg-white p-2 text-sm"
                >
                  {Object.entries(
                    POST_CONTENT_WIDTHS
                  ).map(
                    ([key, option]) => (
                      <option
                        key={key}
                        value={key}
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </label>
            </div>

            <div
              className={`rounded-xl bg-gradient-to-br ${POST_THEMES[theme].hero} p-4`}
            >
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${POST_THEMES[theme].badge}`}
              >
                {POST_THEMES[theme].label}
              </span>

              <p
                className={`mt-3 text-lg font-bold ${POST_THEMES[theme].accent}`}
              >
                Appearance Preview
              </p>

              <p className="mt-1 text-sm text-gm-ink/60">
                {POST_CONTENT_WIDTHS[
                  contentWidth
                ].label}
              </p>
            </div>
          </section>

          {/* TYPOGRAPHY */}
          <section className="space-y-4 rounded-2xl border border-gm-paper-2 bg-gm-paper-2 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">
                  Typography
                </h2>

                <p className="mt-1 text-sm text-gm-ink/60">
                  Customize this post's reading experience.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFontSize("medium");
                  setParagraphSpacing(
                    "comfortable"
                  );
                  setLineHeight(
                    "comfortable"
                  );
                  setFontFamily("sans");
                }}
                className="text-sm font-medium text-gm-green hover:text-gm-green-dark"
              >
                Reset typography
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Body Font Size

                <select
                  value={fontSize}
                  onChange={(event) => {
                    if (
                      isPostFontSize(
                        event.target.value
                      )
                    ) {
                      setFontSize(
                        event.target.value
                      );
                    }
                  }}
                  className="mt-1 w-full rounded-md border border-gm-paper-2 bg-white p-2 text-sm"
                >
                  {Object.entries(
                    POST_TYPOGRAPHY.fontSize
                  ).map(
                    ([key, option]) => (
                      <option
                        key={key}
                        value={key}
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label className="block text-sm font-medium">
                Paragraph Spacing

                <select
                  value={paragraphSpacing}
                  onChange={(event) => {
                    if (
                      isPostParagraphSpacing(
                        event.target.value
                      )
                    ) {
                      setParagraphSpacing(
                        event.target.value
                      );
                    }
                  }}
                  className="mt-1 w-full rounded-md border border-gm-paper-2 bg-white p-2 text-sm"
                >
                  {Object.entries(
                    POST_TYPOGRAPHY
                      .paragraphSpacing
                  ).map(
                    ([key, option]) => (
                      <option
                        key={key}
                        value={key}
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label className="block text-sm font-medium">
                Line Height

                <select
                  value={lineHeight}
                  onChange={(event) => {
                    if (
                      isPostLineHeight(
                        event.target.value
                      )
                    ) {
                      setLineHeight(
                        event.target.value
                      );
                    }
                  }}
                  className="mt-1 w-full rounded-md border border-gm-paper-2 bg-white p-2 text-sm"
                >
                  {Object.entries(
                    POST_TYPOGRAPHY.lineHeight
                  ).map(
                    ([key, option]) => (
                      <option
                        key={key}
                        value={key}
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label className="block text-sm font-medium">
                Font Style

                <select
                  value={fontFamily}
                  onChange={(event) => {
                    if (
                      isPostFontFamily(
                        event.target.value
                      )
                    ) {
                      setFontFamily(
                        event.target.value
                      );
                    }
                  }}
                  className="mt-1 w-full rounded-md border border-gm-paper-2 bg-white p-2 text-sm"
                >
                  {Object.entries(
                    POST_TYPOGRAPHY.fontFamily
                  ).map(
                    ([key, option]) => (
                      <option
                        key={key}
                        value={key}
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </label>
            </div>
          </section>

          {/* COVER + GALLERY */}
          <section className="space-y-4 border-t border-gm-paper-2 pt-6">
            <div>
              <h2 className="text-base font-semibold">
                Cover Photos
              </h2>

              <p className="mt-1 text-sm text-gm-ink/60">
                Add one main cover photo and gallery photos.
              </p>
            </div>

            {/* COVER */}
            <div>
              <label
                htmlFor="post-thumbnail"
                className="block text-sm font-medium text-gm-ink/80"
              >
                Main Cover Photo
              </label>

              {initialData?.thumbnail &&
                !thumbnailFile && (
                  <div className="relative mt-2 aspect-[16/9] max-w-lg overflow-hidden rounded-md bg-gm-paper-2">
                    <Image
                      src={
                        initialData.thumbnail
                      }
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
                onChange={(event) =>
                  setThumbnailFile(
                    event.target.files?.[0] ??
                      null
                  )
                }
                className="mt-2 block w-full text-sm"
              />

              {thumbnailFile && (
                <p className="mt-2 text-sm text-gm-ink/60">
                  Selected:{" "}
                  {thumbnailFile.name}
                </p>
              )}
            </div>

            {/* GALLERY */}
            <div>
              <label
                htmlFor="post-gallery"
                className="block text-sm font-medium text-gm-ink/80"
              >
                Gallery Photos (
                {galleryImages.length +
                  galleryFiles.length}
                )
              </label>

              {(galleryImages.length > 0 ||
                galleryFiles.length > 0) && (
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {galleryImages.map(
                    (image, index) => (
                      <div
                        key={`${image}-${index}`}
                      >
                        <div className="relative aspect-square overflow-hidden rounded-md bg-gm-paper-2">
                          <Image
                            src={image}
                            alt={`Gallery photo ${
                              index + 1
                            }`}
                            fill
                            sizes="(max-width: 640px) 50vw, 160px"
                            className="object-cover"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setGalleryImages(
                              (current) =>
                                current.filter(
                                  (_, i) =>
                                    i !== index
                                )
                            )
                          }
                          className="mt-1 text-xs text-red-700 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    )
                  )}

                  {galleryFiles.map(
                    (file, index) => (
                      <div
                        key={`${file.name}-${file.lastModified}`}
                      >
                        <div className="flex aspect-square items-center justify-center rounded-md bg-gm-paper-2 p-2 text-center text-xs">
                          {file.name}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setGalleryFiles(
                              (current) =>
                                current.filter(
                                  (_, i) =>
                                    i !== index
                                )
                            )
                          }
                          className="mt-1 text-xs text-red-700 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}

              <input
                id="post-gallery"
                type="file"
                accept="image/*"
                multiple
                onChange={
                  handleGallerySelection
                }
                className="mt-3 block w-full text-sm"
              />
            </div>
          </section>

          {/* ERROR */}
          {error && (
            <p
              role="alert"
              className="rounded-md bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* ACTIONS */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                {
                  setPreviewContent(
                    sanitizePostPreview(
                      editorRef.current?.innerHTML ??
                        initialData?.content ??
                        ""
                    )
                  );
                  setShowPreview(true);
                }
              }
              className="flex-1 rounded-md border border-gm-green bg-white px-4 py-3 text-sm font-medium text-gm-green hover:bg-gm-paper-2"
            >
              Preview Post
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-md bg-gm-maroon px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gm-maroon-dark disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : postId
                  ? "Save Changes"
                  : status === "published"
                    ? "Publish Post"
                    : "Save Draft"}
            </button>
          </div>
        </form>

        {/* PREVIEW MODAL */}
        {showPreview && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-4">
            <div className="mx-auto my-8 max-w-4xl rounded-2xl bg-white shadow-2xl">

              <div className="flex items-center justify-between border-b p-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gm-green">
                    Post Preview
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    {title ||
                      "Untitled Post"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowPreview(false)
                  }
                  className="rounded-md border px-3 py-2 text-sm hover:bg-gm-paper-2"
                >
                  Close
                </button>
              </div>

              <article className="p-6 sm:p-10">

                {thumbnailFile && (
                  <div className="mb-6 overflow-hidden rounded-xl">
                    <img
                      src={URL.createObjectURL(
                        thumbnailFile
                      )}
                      alt="Post preview"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                )}

                <div className="mb-4 flex flex-wrap items-center gap-2">
                  {category && (
                    <span className="rounded-full bg-gm-paper-2 px-3 py-1 text-xs font-medium">
                      {category}
                    </span>
                  )}

                  {featured && (
                    <span className="rounded-full bg-gm-maroon px-3 py-1 text-xs font-medium text-white">
                      Featured
                    </span>
                  )}

                  <span className="rounded-full bg-gm-paper-2 px-3 py-1 text-xs font-medium">
                    {status}
                  </span>
                </div>

                <h1 className="text-3xl font-bold sm:text-4xl">
                  {title ||
                    "Untitled Post"}
                </h1>

                {excerpt && (
                  <p className="mt-4 text-lg text-gm-ink/60">
                    {excerpt}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-gm-ink/50">
                  <span>
                    {wordCount} words
                  </span>

                  <span>•</span>

                  <span>
                    {readingTime} min read
                  </span>
                </div>

                {tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-gm-green"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div
                  className={`prose mt-8 max-w-none ${
                    POST_TYPOGRAPHY
                      .fontSize[fontSize]
                      .className
                  } ${
                    POST_TYPOGRAPHY
                      .fontFamily[fontFamily]
                      .className
                  } ${
                    POST_TYPOGRAPHY
                      .paragraphSpacing[
                        paragraphSpacing
                      ].className
                  } ${
                    POST_TYPOGRAPHY
                      .lineHeight[lineHeight]
                      .className
                  }`}
                  dangerouslySetInnerHTML={{
                    __html:
                      previewContent,
                  }}
                />
              </article>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}