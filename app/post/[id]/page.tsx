import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
} from "@/lib/post-style";
import type { IPost } from "@/lib/models/Post";
import { sanitizePostContent } from "@/lib/post-content";
import mongoose from "mongoose";
import { getPostReadingTime } from "@/lib/post-display";

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();

  let post: IPost | null;

  try {
    post =
      (await Post.findOne({ slug: id, status: { $ne: "draft" } })) ??
      (mongoose.isValidObjectId(id)
        ? await Post.findOne({ _id: id, status: { $ne: "draft" } })
        : null);
  } catch {
    notFound();
  }

  if (!post) notFound();

  const theme = isPostTheme(post.theme) ? post.theme : "ocean";
  const contentWidth = isPostContentWidth(post.contentWidth) ? post.contentWidth : "standard";
  const fontSize = isPostFontSize(post.fontSize) ? post.fontSize : "medium";
  const paragraphSpacing = isPostParagraphSpacing(post.paragraphSpacing)
    ? post.paragraphSpacing
    : "comfortable";
  const lineHeight = isPostLineHeight(post.lineHeight) ? post.lineHeight : "comfortable";
  const fontFamily = isPostFontFamily(post.fontFamily) ? post.fontFamily : "sans";
  const postTheme = POST_THEMES[theme];
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const safeContent = sanitizePostContent(post.content || "");
  const readingTime = getPostReadingTime(safeContent);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const shareUrl = `${siteUrl}/post/${post.slug || id}`;
  const relatedPosts = await Post.find({
    _id: { $ne: post._id },
    category: post.category,
    status: { $ne: "draft" },
  })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
        <section className="relative overflow-hidden">
          <div className={`absolute inset-x-0 top-0 h-80 bg-gradient-to-br ${postTheme.hero}`} />

          <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-24 sm:px-6 lg:px-8 lg:pt-28">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <li><Link href="/" className="transition-colors hover:text-gm-maroon">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/post" className={`font-medium transition-colors ${postTheme.accent} ${postTheme.accentHover}`}>Blog</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="max-w-[16rem] truncate font-medium text-slate-900">{post.category}</li>
              </ol>
            </nav>

            <div className="mx-auto max-w-4xl pt-8 text-center sm:pt-10">
              <span className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] ${postTheme.badge}`}>
                {post.category}
              </span>
              {post.featured && (
                <span className="ml-2 inline-flex rounded-full bg-gm-maroon px-3 py-1 text-xs font-semibold text-white">
                  Featured
                </span>
              )}

              <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                  {post.excerpt}
                </p>
              )}
              {post.tags?.length > 0 && (
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  {formattedDate}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  {readingTime}
                </span>
              </div>

            </div>
          </div>
        </section>

        {post.thumbnail && (
          <section className="mx-auto mb-12 max-w-6xl px-4 sm:px-6 lg:px-8 sm:mb-16">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                className="object-cover"
              />
            </div>
          </section>
        )}

        <article className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10">
            <div
              className={`
                prose ${POST_CONTENT_WIDTHS[contentWidth].className}
                ${POST_TYPOGRAPHY.fontSize[fontSize].className}
                ${POST_TYPOGRAPHY.paragraphSpacing[paragraphSpacing].className}
                ${POST_TYPOGRAPHY.lineHeight[lineHeight].className}
                ${POST_TYPOGRAPHY.fontFamily[fontFamily].className}
                prose-headings:font-black
                prose-headings:tracking-tight
                prose-headings:text-slate-950
                prose-h1:text-3xl
                prose-h1:mt-12
                prose-h1:mb-6
                prose-h2:text-2xl
                prose-h2:mt-14
                prose-h2:mb-6
                prose-h3:text-xl
                prose-h3:mt-10
                prose-h3:mb-4
                prose-p:text-slate-700
                prose-a:font-medium
                prose-a:underline-offset-4
                prose-strong:text-slate-900
                prose-li:text-slate-700
                prose-ul:my-7
                prose-ol:my-7
                prose-blockquote:border-l-4
                prose-blockquote:bg-slate-50
                prose-blockquote:px-6
                prose-blockquote:py-4
                prose-blockquote:rounded-r-2xl
                prose-blockquote:not-italic
                prose-blockquote:text-slate-700
                prose-img:rounded-3xl
                prose-img:my-10
                prose-hr:my-12
                prose-hr:border-slate-200
                prose-pre:rounded-2xl
                prose-pre:bg-slate-950
                prose-code:text-blue-700
                prose-code:before:content-none
                prose-code:after:content-none
                sm:prose-xl
                [&_iframe]:max-w-full
                [&_table]:block
                [&_table]:max-w-full
                [&_table]:overflow-x-auto
                [&_img]:h-auto
                [&_img]:max-w-full
                [&_figure]:my-10
                [&_figcaption]:text-center
                [&_figcaption]:text-sm
                [&_figcaption]:text-slate-500
                [&_pre_code]:text-slate-100
                ${postTheme.prose}
              `}
              dangerouslySetInnerHTML={{ __html: safeContent }}
            />

            <aside className="mt-12 lg:mt-0">
              <div className="lg:sticky lg:top-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                  Article details
                </p>

                <ul className="mt-5 space-y-3 text-sm text-slate-600">
                  <li className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <span>Category</span>
                    <span className="font-semibold text-slate-900">{post.category}</span>
                  </li>
                  <li className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <span>Published</span>
                    <span className="font-semibold text-slate-900">{formattedDate}</span>
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <span>Read time</span>
                    <span className="font-semibold text-slate-900">{readingTime}</span>
                  </li>
                </ul>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Share
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      X
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Read this article: ${shareUrl}`)}`}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {post.extraImages && post.extraImages.length > 0 && (
            <section className="mt-16 border-t border-slate-200 pt-10 sm:pt-12">
              <div className="mb-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                  More to explore
                </p>

                <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Photo gallery
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {post.extraImages.map((img: string, idx: number) => (
                  <div
                    key={`${img}-${idx}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100 shadow-sm"
                  >
                    <Image
                      src={img}
                      alt={`${post.title} - Gallery image ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
                      <p className="text-sm font-medium text-white">Image {idx + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-16 border-t border-slate-200 pt-8">
            <Link
              href="/post"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
            >
              <span aria-hidden="true">&larr;</span>
              Explore more posts
            </Link>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${postTheme.accent}`}>
                  Keep reading
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                  Related posts
                </h2>
              </div>

              <Link
                href="/post"
                className={`text-sm font-semibold transition-colors ${postTheme.accent} ${postTheme.accentHover}`}
              >
                View all posts
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={String(relatedPost._id)}
                  className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <Link href={`/post/${relatedPost.slug || relatedPost._id}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      {relatedPost.thumbnail && (
                        <Image
                          src={relatedPost.thumbnail}
                          alt={relatedPost.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>

                    <div className="p-5">
                      <p className={`text-xs font-bold uppercase tracking-[0.2em] ${postTheme.accent}`}>
                        {relatedPost.category}
                      </p>
                      <h3 className={`mt-3 text-xl font-bold tracking-tight text-slate-950 ${postTheme.card}`}>
                        {relatedPost.title}
                      </h3>
                      {relatedPost.excerpt && (
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                          {relatedPost.excerpt}
                        </p>
                      )}
                      <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                        {new Date(relatedPost.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                        <span>{getPostReadingTime(relatedPost.content || "")}</span>
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
