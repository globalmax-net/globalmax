import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import { POST_THEMES, isPostTheme, type PostTheme } from "@/lib/post-style";
import { getPostExcerpt, getPostReadingTime } from "@/lib/post-display";

export default async function PostsPage() {
  await connectDB();
  const posts = await Post.find({ status: { $ne: "draft" } })
    .select("_id title slug category excerpt content thumbnail createdAt theme featured")
    .sort({ createdAt: -1 })
    .lean();
  const featuredPost = posts.find((post) => post.featured);
  const articlePosts = featuredPost
    ? posts.filter((post) => String(post._id) !== String(featuredPost._id))
    : posts;
  const featuredThemeKey: PostTheme =
    featuredPost && isPostTheme(featuredPost.theme) ? featuredPost.theme : "ocean";
  const featuredTheme = POST_THEMES[featuredThemeKey];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gm-paper-2/70 via-white to-white pb-20 pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gm-green">
              Global Max Journal
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-gm-ink sm:text-5xl">
              Ideas, insights &amp; stories
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gm-ink/65 sm:text-lg">
              Practical guidance and fresh perspectives from the Global Max team.
              Explore our latest articles and updates.
            </p>
          </header>

          {posts.length > 0 ? (
            <>
              {featuredPost && (
                <section aria-labelledby="featured-article-heading" className="mt-12 sm:mt-16">
                  <Link
                    href={`/post/${featuredPost.slug || featuredPost._id}`}
                    className="group grid overflow-hidden rounded-3xl border border-gm-paper-2 bg-white shadow-[0_24px_70px_rgba(32,27,27,0.09)] transition-shadow hover:shadow-[0_30px_80px_rgba(32,27,27,0.14)] lg:grid-cols-[1.1fr_0.9fr]"
                  >
                    <div className="relative aspect-[16/10] min-h-64 overflow-hidden bg-gm-paper-2 lg:aspect-auto lg:min-h-[420px]">
                      {featuredPost.thumbnail && (
                        <Image
                          src={featuredPost.thumbnail}
                          alt={featuredPost.title}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-gm-maroon shadow-sm">
                        Featured article
                      </span>
                    </div>
                    <div className={`flex flex-col justify-center bg-gradient-to-br ${featuredTheme.hero} p-6 sm:p-10 lg:p-12`}>
                      <span className={`w-fit rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${featuredTheme.badge}`}>
                        {featuredPost.category}
                      </span>
                      <h2
                        id="featured-article-heading"
                        className={`mt-5 text-3xl font-black leading-tight tracking-tight text-gm-ink sm:text-4xl ${featuredTheme.card}`}
                      >
                        {featuredPost.title}
                      </h2>
                      <p className="mt-4 text-base leading-7 text-gm-ink/70">
                        {getPostExcerpt(featuredPost.excerpt, featuredPost.content)}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gm-ink/60">
                        <time dateTime={new Date(featuredPost.createdAt).toISOString()}>
                          {new Date(featuredPost.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <span aria-hidden="true">·</span>
                        <span>{getPostReadingTime(featuredPost.content)}</span>
                      </div>
                      <span className={`mt-8 inline-flex items-center gap-2 text-sm font-bold ${featuredTheme.accent}`}>
                        Read featured article <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </section>
              )}

              <section aria-labelledby="latest-articles-heading" className="mt-16 sm:mt-20">
                <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gm-green">
                      The latest
                    </p>
                    <h2 id="latest-articles-heading" className="mt-2 text-2xl font-bold tracking-tight text-gm-ink sm:text-3xl">
                      {featuredPost ? "More articles" : "Latest articles"}
                    </h2>
                  </div>
                  <p className="text-sm text-gm-ink/55">
                    {articlePosts.length} {articlePosts.length === 1 ? "article" : "articles"}
                  </p>
                </div>

                {articlePosts.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {articlePosts.map((post) => {
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
                        {post.featured && (
                          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gm-maroon shadow-sm">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5 sm:p-6">
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
                ) : featuredPost ? (
                  <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
                    More articles will appear here soon.
                  </p>
                ) : null}
              </section>
            </>
          ) : (
            <div className="mt-14 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gm-green">
                Coming soon
              </p>
              <h2 className="mt-3 text-2xl font-bold text-gm-ink">Our articles are on the way</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gm-ink/60">
                Please check back soon for practical guidance, company news, and fresh perspectives.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}