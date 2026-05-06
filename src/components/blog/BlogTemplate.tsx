import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { BlogPost } from "@/lib/blog";
import { Container } from "@/components/ui/container";
import { mdxComponents, CTA } from "./mdx-components";
import { AuthorBio } from "./AuthorBio";
import { RelatedPosts } from "./RelatedPosts";
import { BottomCtaBand } from "./BottomCtaBand";
import { StickyMobileCta } from "./StickyMobileCta";

type Props = {
  post: BlogPost;
  related: BlogPost[];
};

const longDateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(value: string): string {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return longDateFormatter.format(parsed);
}

function buildBreadcrumb(post: BlogPost): string[] {
  if (post.breadcrumb && post.breadcrumb.length > 0) return post.breadcrumb;
  return ["Blog", post.title];
}

const BREADCRUMB_HREFS: Record<string, string> = {
  Blog: "/blog",
  Insights: "/blog",
  Home: "/",
};

/**
 * The BlogTemplate is intentionally render-only. Metadata, JSON-LD,
 * canonical handling and `noindex` for drafts are emitted by
 * `app/blog/[slug]/page.tsx` so this component stays composable for
 * future formats (e.g. a printable or AMP-style variant).
 */
export function BlogTemplate({ post, related }: Props) {
  const breadcrumb = buildBreadcrumb(post);

  return (
    <>
      <article className="pb-24 pt-10 sm:pt-14">
        <Container width="narrow">
          <BlogBreadcrumb trail={breadcrumb} />

          <header className="mt-6">
            {post.draft && (
              <p className="mb-4 inline-flex items-center rounded-full border border-[color:var(--ordron-amber)]/40 bg-[color:var(--ordron-amber)]/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink">
                Draft preview &mdash; not indexed, not in sitemap
              </p>
            )}
            <h1 className="font-display text-[40px] font-semibold leading-[1.08] text-ink sm:text-[48px] lg:text-[54px]">
              {post.title}
            </h1>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px] text-ink-muted">
              <span>{post.author}</span>
              {post.date && (
                <>
                  <span aria-hidden="true" className="text-ink-faint">
                    &middot;
                  </span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </>
              )}
              {post.readTime && (
                <>
                  <span aria-hidden="true" className="text-ink-faint">
                    &middot;
                  </span>
                  <span>{post.readTime}</span>
                </>
              )}
            </p>
          </header>
        </Container>

        {post.heroImage && (
          <Container width="default" className="mt-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-surface-2">
              <Image
                src={post.heroImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 1140px"
                priority
                className="object-cover"
              />
            </div>
          </Container>
        )}

        <Container width="narrow" className="mt-10 sm:mt-12">
          <div className="prose-blog">
            <MDXRemote
              source={post.body}
              components={mdxComponents}
              options={{
                parseFrontmatter: false,
                // `blockJS` defaults to true in next-mdx-remote v6 and
                // strips all JSX attribute expressions (e.g. `items={[...]}`)
                // as a sandboxing measure. The blog content pipeline
                // here is trusted: the SEO agent commits to our own
                // repo over a scoped PAT and Vercel rebuilds from
                // main. We disable the JSX-expression block so the
                // agent's `<ComparisonTable rows={[[...]]} />` props
                // survive compilation. `blockDangerousJS` stays on
                // to keep `{eval(...)}` style escape hatches blocked.
                blockJS: false,
                blockDangerousJS: true,
                mdxOptions: {
                  // `format: "mdx"` is required when source is passed
                  // as a string. The default `"detect"` falls back to
                  // markdown without a file extension and degrades
                  // any embedded JSX.
                  format: "mdx",
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypeAutolinkHeadings,
                      {
                        behavior: "wrap",
                        properties: {
                          className: ["heading-anchor"],
                        },
                      },
                    ],
                  ],
                },
              }}
            />
          </div>

          <div className="mt-12">
            <CTA slot="inline-form" />
          </div>

          {post.faqSchema.length > 0 && <BlogFaqSection faqs={post.faqSchema} />}

          {post.references.length > 0 && (
            <BlogReferences references={post.references} />
          )}

          <AuthorBio name={post.author} />

          <RelatedPosts posts={related} />
        </Container>
      </article>

      <BottomCtaBand />

      <StickyMobileCta />
    </>
  );
}

type BlogBreadcrumbProps = {
  trail: string[];
};

function BlogBreadcrumb({ trail }: BlogBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-[12.5px] text-ink-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
        </li>
        {trail.map((label, i) => {
          const isLast = i === trail.length - 1;
          const href = BREADCRUMB_HREFS[label];
          return (
            <li key={`${label}-${i}`} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-ink-faint">
                /
              </span>
              {isLast || !href ? (
                <span aria-current={isLast ? "page" : undefined}>{label}</span>
              ) : (
                <Link href={href} className="hover:text-ink">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

type BlogFaqSectionProps = {
  faqs: BlogPost["faqSchema"];
};

function BlogFaqSection({ faqs }: BlogFaqSectionProps) {
  return (
    <section className="mt-16 border-t border-line-soft pt-12">
      <h2 className="font-display text-[28px] font-semibold leading-tight text-ink sm:text-[32px]">
        Frequently asked questions
      </h2>
      <dl className="mt-8 space-y-8">
        {faqs.map((faq, i) => (
          <div key={i}>
            <dt className="font-display text-[19px] font-semibold leading-snug text-ink sm:text-[21px]">
              {faq.question}
            </dt>
            <dd className="mt-3 text-[16px] leading-[1.7] text-ink-soft sm:text-[17px]">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

type BlogReferencesProps = {
  references: BlogPost["references"];
};

function BlogReferences({ references }: BlogReferencesProps) {
  return (
    <section className="mt-16 border-t border-line-soft pt-10">
      <h2 className="font-display text-[20px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
        References
      </h2>
      <ol className="mt-6 list-decimal space-y-3 pl-6 text-[14.5px] leading-relaxed text-ink-soft marker:font-semibold marker:text-ink-muted">
        {references.map((ref, i) => (
          <li key={i}>
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-deep underline decoration-brand/40 underline-offset-[3px] hover:decoration-brand"
            >
              {ref.title}
            </a>
            {ref.note && (
              <span className="text-ink-muted"> &mdash; {ref.note}</span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
