import Image from "next/image";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import { getPostExcerpt, getPostReadingTime } from "@/lib/post-display";
import { isPostTheme, POST_THEMES, type PostTheme } from "@/lib/post-style";

export default async function LatestPosts() {
  await connectDB();
  const posts = await Post.find({ status: { $ne: "draft" } })
    .select("_id title slug category excerpt content thumbnail createdAt theme")
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <section aria-labelledby="home-latest-posts" className="bg-gm-paper-2/60 py-10 sm:py-14">
      <div className="gm-container px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gm-green">
              Global Max Journal
            </p>
            <h2 id="home-latest-posts" className="mt-2 text-3xl font-bold tracking-tight text-gm-ink sm:text-4xl 2xl:text-5xl">
              Latest articles
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gm-ink/65 sm:text-base">
              Read our latest guidance, company news, and perspectives.
            </p>
          </div>
          <Link
            href="/post"
            className="inline-flex items-center gap-2 rounded-md border border-gm-green px-4 py-2.5 text-sm font-semibold text-gm-green-dark transition-colors hover:bg-gm-green hover:text-white"
          >
            Visit the blog <span aria-hidden="true">→</span>
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const themeKey: PostTheme = isPostTheme(post.theme) ? post.theme : "ocean";
              const theme = POST_THEMES[themeKey];

              return (
                <article
                  key={String(post._id)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href={`/post/${post.slug || post._id}`} className="flex h-full flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      {post.thumbnail && (
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className={`text-xs font-bold uppercase tracking-[0.15em] ${theme.accent}`}>
                          {post.category}
                        </span>
                        <span className="shrink-0 text-xs text-slate-500">
                          {getPostReadingTime(post.content)}
                        </span>
                      </div>
                      <h3 className={`mt-3 text-xl font-bold leading-snug tracking-tight text-slate-950 ${theme.card}`}>
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
                        {getPostExcerpt(post.excerpt, post.content)}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <time className="text-xs text-slate-500" dateTime={new Date(post.createdAt).toISOString()}>
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <span className={`inline-flex items-center gap-1 text-sm font-semibold ${theme.accent}`}>
                          Read article <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
            <p className="text-sm text-gm-ink/60">New articles and updates are coming soon.</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/post" className="text-sm font-semibold text-gm-green-dark underline underline-offset-4 hover:text-gm-maroon">
            Browse all articles
          </Link>
        </div>
      </div>
    </section>
  );
}
