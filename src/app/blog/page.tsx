import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { BlogCard } from "@/components/blog/BlogCard";
import { BottomCtaBand } from "@/components/blog/BottomCtaBand";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

const POSTS_PER_PAGE = 12;

type PageProps = {
  searchParams?: Promise<{ page?: string }>;
};

export const metadata: Metadata = {
  title: "Insights | Finance automation articles for AU CFOs",
  description:
    "Plain-language articles on finance automation for Australian mid-market businesses. AP, AR, reconciliations, month-end close, and the platforms that make them faster.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Ordron Insights",
    description:
      "Plain-language finance automation articles for Australian mid-market businesses.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ordron Insights",
    description:
      "Plain-language finance automation articles for Australian mid-market businesses.",
  },
};

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const posts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  if (
    Number.isNaN(requestedPage) ||
    requestedPage < 1 ||
    requestedPage > totalPages
  ) {
    notFound();
  }

  const start = (requestedPage - 1) * POSTS_PER_PAGE;
  const visible = posts.slice(start, start + POSTS_PER_PAGE);
  const isFirstPage = requestedPage === 1;
  const featurePost = isFirstPage ? visible[0] : null;
  const restPosts = isFirstPage ? visible.slice(1) : visible;

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 pb-20">
        <section className="border-b border-line-soft bg-surface-2">
          <Container className="py-16 sm:py-20">
            <p className="eyebrow">Insights</p>
            <h1 className="mt-4 max-w-3xl font-display text-[40px] font-semibold leading-[1.1] text-ink sm:text-[52px]">
              Finance automation, written for the people who actually run
              finance.
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-soft sm:text-[18px]">
              Plain English. Australian context. No fluff. Articles, deep
              dives, and platform notes for CFOs and finance directors at
              $10M to $50M businesses.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={siteConfig.ctas.healthCheck.href}
                className="inline-flex h-12 items-center justify-center rounded-full bg-teal px-6 text-[15px] font-medium text-white transition-colors hover:bg-teal/90"
              >
                {siteConfig.ctas.healthCheck.label}
              </Link>
              <Link
                href={siteConfig.ctas.scorecard.href}
                className="inline-flex h-12 items-center justify-center rounded-full border border-teal/70 px-6 text-[15px] font-medium text-teal transition-colors hover:bg-teal/10"
              >
                {siteConfig.ctas.scorecard.label}
              </Link>
            </div>
          </Container>
        </section>

        <Container className="py-16 sm:py-20">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-12">
              {featurePost && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
                    Latest
                  </p>
                  <div className="mt-4">
                    <BlogCard post={featurePost} variant="feature" />
                  </div>
                </div>
              )}

              {restPosts.length > 0 && (
                <div>
                  {isFirstPage && featurePost && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
                      Catalogue
                    </p>
                  )}
                  <div
                    className={cn(
                      "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
                      isFirstPage && featurePost && "mt-4",
                    )}
                  >
                    {restPosts.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                </div>
              )}

              {totalPages > 1 && (
                <Pagination
                  currentPage={requestedPage}
                  totalPages={totalPages}
                />
              )}
            </div>
          )}
        </Container>
      </main>
      <BottomCtaBand />
      <SiteFooter />
    </>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface-2 p-10 text-center">
      <h2 className="font-display text-[22px] font-semibold text-ink">
        First articles are on the way
      </h2>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
        Our editorial calendar runs continuously. While the catalogue fills
        up, the four cluster guides cover the foundations.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/guides/accounts-payable-automation"
          className="inline-flex h-11 items-center justify-center rounded-full border border-teal/70 px-5 text-[14px] font-medium text-teal transition-colors hover:bg-teal/10"
        >
          AP automation guide
        </Link>
        <Link
          href="/guides/month-end-close-automation"
          className="inline-flex h-11 items-center justify-center rounded-full border border-teal/70 px-5 text-[14px] font-medium text-teal transition-colors hover:bg-teal/10"
        >
          Month-end close guide
        </Link>
      </div>
    </div>
  );
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const prevHref =
    currentPage <= 2 ? "/blog" : `/blog?page=${currentPage - 1}`;
  const nextHref = `/blog?page=${currentPage + 1}`;

  return (
    <nav
      aria-label="Article pagination"
      className="mt-6 flex items-center justify-between border-t border-line-soft pt-8"
    >
      {currentPage > 1 ? (
        <Link
          href={prevHref}
          className="inline-flex h-11 items-center rounded-full border border-line px-5 text-[14px] font-medium text-ink transition-colors hover:border-ink"
        >
          <span aria-hidden="true" className="mr-2">
            {"\u2190"}
          </span>
          Newer
        </Link>
      ) : (
        <span />
      )}

      <p className="text-[13px] text-ink-muted numeric">
        Page {currentPage} of {totalPages}
      </p>

      {currentPage < totalPages ? (
        <Link
          href={nextHref}
          className="inline-flex h-11 items-center rounded-full border border-line px-5 text-[14px] font-medium text-ink transition-colors hover:border-ink"
        >
          Older
          <span aria-hidden="true" className="ml-2">
            {"\u2192"}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
