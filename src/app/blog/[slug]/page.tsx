import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BlogTemplate } from "@/components/blog/BlogTemplate";
import {
  getAllPostsIncludingDrafts,
  getPostBySlug,
  getRelatedPosts,
  type BlogPost,
} from "@/lib/blog";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-render every MDX file in `content/blog/`, including drafts,
 * so editors can review at /blog/{slug}. Drafts are tagged with
 * `noindex` and excluded from the index, sitemap and related-posts
 * surfaces by the data layer.
 */
export async function generateStaticParams() {
  return getAllPostsIncludingDrafts().map((post) => ({ slug: post.slug }));
}

function ogImageFor(post: BlogPost): string | undefined {
  if (!post.heroImage) return undefined;
  if (post.heroImage.startsWith("http")) return post.heroImage;
  return `${siteConfig.url}${post.heroImage}`;
}

function buildBreadcrumb(post: BlogPost): string[] {
  if (post.breadcrumb && post.breadcrumb.length > 0) return post.breadcrumb;
  return ["Blog", post.title];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Article not found | Ordron",
      robots: { index: false, follow: true },
    };
  }

  const url = `/blog/${post.slug}`;
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const ogImage = ogImageFor(post);

  // Drafts: noindex, no canonical. Anything else: canonical to the
  // live URL plus the standard OG/Twitter pair.
  if (post.draft) {
    return {
      title,
      description,
      robots: { index: false, follow: true },
      openGraph: {
        title,
        description,
        type: "article",
        ...(ogImage
          ? { images: [{ url: ogImage, alt: post.title }] }
          : {}),
      },
      twitter: {
        card: ogImage ? "summary_large_image" : "summary",
        title,
        description,
      },
    };
  }

  return {
    title,
    description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.date || undefined,
      authors: [post.author],
      tags: post.tags,
      ...(ogImage ? { images: [{ url: ogImage, alt: post.title }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);

  const baseUrl = siteConfig.url;
  const pageUrl = `${baseUrl}/blog/${post.slug}`;
  const ogImage = ogImageFor(post);
  const breadcrumb = buildBreadcrumb(post);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    ...(ogImage ? { image: ogImage } : {}),
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    wordCount: post.wordCount,
    inLanguage: "en-AU",
    keywords: post.keywords.join(", "),
    author: {
      "@type": "Organization",
      name: post.author,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      ...breadcrumb.map((label, i) => {
        const isLast = i === breadcrumb.length - 1;
        return {
          "@type": "ListItem",
          position: i + 2,
          name: label,
          item: isLast
            ? pageUrl
            : label === "Blog" || label === "Insights"
              ? `${baseUrl}/blog`
              : pageUrl,
        };
      }),
    ],
  };

  const faqSchema =
    post.faqSchema.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqSchema.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <BlogTemplate post={post} related={related} />
      </main>
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
