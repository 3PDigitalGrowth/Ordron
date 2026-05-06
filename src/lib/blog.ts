import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

/**
 * Blog data layer
 * ------------------------------------------------------------------
 * Reads `content/blog/*.mdx` (the exact path the SEO agent commits
 * into via the `github_template` delivery method, see
 * `agents/seo/docs/blog-template-spec.md`).
 *
 * Draft handling (spec v2):
 *   - `getAllPosts()` excludes drafts. Used by the index page,
 *     related-posts queries and the sitemap.
 *   - `getAllPostsIncludingDrafts()` is used only by
 *     `generateStaticParams` so editors can review drafts at
 *     `/blog/{slug}` without them leaking into discovery surfaces.
 *
 * The frontmatter contract here mirrors spec §2 verbatim; the agent
 * is the source of truth for the shape, so do not rename fields
 * without coordinating with the agent's frontmatter writer.
 */

export type BlogReference = {
  title: string;
  url: string;
  note?: string;
};

export type BlogInternalLink = {
  url: string;
  anchor: string;
};

export type BlogFaqEntry = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  readTime: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  keywords: string[];
  tags: string[];
  heroImage?: string;
  breadcrumb?: string[];
  faqSchema: BlogFaqEntry[];
  internalLinks: BlogInternalLink[];
  references: BlogReference[];
  draft: boolean;
  /** Raw MDX body with frontmatter stripped. Compiled per request. */
  body: string;
  /** First ~160 characters of body, used as an excerpt on the index. */
  excerpt: string;
  /** Estimated word count, used in Article JSON-LD. */
  wordCount: number;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * The agent always writes the frontmatter shape we type as
 * `BlogPost`, but at the gray-matter boundary the values are `unknown`.
 * Keep the parsing strict but forgiving: missing optional fields fall
 * back to safe defaults rather than throwing, so a near-empty MDX file
 * still renders end-to-end during onboarding.
 */
function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

function asBool(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function asFaqArray(value: unknown): BlogFaqEntry[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const e = entry as Record<string, unknown>;
      const question = asString(e.question);
      const answer = asString(e.answer);
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((e): e is BlogFaqEntry => e !== null);
}

function asInternalLinks(value: unknown): BlogInternalLink[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const e = entry as Record<string, unknown>;
      const url = asString(e.url);
      const anchor = asString(e.anchor);
      if (!url || !anchor) return null;
      return { url, anchor };
    })
    .filter((e): e is BlogInternalLink => e !== null);
}

function asReferences(value: unknown): BlogReference[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const e = entry as Record<string, unknown>;
      const title = asString(e.title);
      const url = asString(e.url);
      if (!title || !url) return null;
      const note = asString(e.note);
      return note ? { title, url, note } : { title, url };
    })
    .filter((e): e is BlogReference => e !== null);
}

/**
 * Strip MDX/JSX components and markdown sugar from the body so the
 * excerpt reads as prose. Best-effort, intentionally not a markdown
 * parser, the index card just needs ~160 readable characters.
 */
function buildExcerpt(body: string, max = 160): string {
  const text = body
    .replace(/<[^>]+\/>/g, " ")
    .replace(/<[^>]+>[\s\S]*?<\/[^>]+>/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_>~|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}\u2026`;
}

function parsePost(slug: string, raw: string): BlogPost {
  const { data, content } = matter(raw);
  const body = content.trimStart();
  const wordCount = readingTime(body).words;
  const fallbackReadTime = readingTime(body).text;

  return {
    slug,
    title: asString(data.title, slug),
    date: asString(data.date),
    author: asString(data.author, "Ordron"),
    readTime: asString(data.readTime, fallbackReadTime),
    metaTitle: asString(data.metaTitle, asString(data.title, slug)),
    metaDescription: asString(data.metaDescription),
    primaryKeyword: asString(data.primaryKeyword),
    keywords: asStringArray(data.keywords),
    tags: asStringArray(data.tags),
    heroImage: asString(data.heroImage) || undefined,
    breadcrumb: Array.isArray(data.breadcrumb)
      ? asStringArray(data.breadcrumb)
      : undefined,
    faqSchema: asFaqArray(data.faqSchema),
    internalLinks: asInternalLinks(data.internalLinks),
    references: asReferences(data.references),
    draft: asBool(data.draft),
    body,
    excerpt: buildExcerpt(body),
    wordCount,
  };
}

/**
 * Read every MDX file under `content/blog/`. The directory may be
 * empty (only the `.gitkeep` file present) on a fresh template, so
 * `readdirSync` is wrapped in a guard.
 */
function loadAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    return parsePost(slug, raw);
  });

  // Newest first by `date`. Posts without a date sink to the bottom.
  posts.sort((a, b) => {
    if (!a.date && !b.date) return a.slug.localeCompare(b.slug);
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });

  return posts;
}

/**
 * Public-facing list. Drafts are excluded so they cannot leak into
 * the index, related posts, sitemap or any other discovery surface.
 */
export function getAllPosts(): BlogPost[] {
  return loadAllPosts().filter((post) => !post.draft);
}

/**
 * Includes drafts. Used by `generateStaticParams` so the detail
 * route renders for editor preview at `/blog/{slug}`.
 */
export function getAllPostsIncludingDrafts(): BlogPost[] {
  return loadAllPosts();
}

export function getPostBySlug(slug: string): BlogPost | null {
  return loadAllPosts().find((post) => post.slug === slug) ?? null;
}

/**
 * Pick `count` related posts based on shared tags. Falls back to the
 * most recent non-draft posts if nothing overlaps. Drafts are always
 * excluded so editor previews never recommend each other.
 */
export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const candidates = getAllPosts().filter((p) => p.slug !== post.slug);
  const tagSet = new Set(post.tags);

  const scored = candidates
    .map((candidate) => ({
      post: candidate,
      score: candidate.tags.reduce(
        (acc, tag) => acc + (tagSet.has(tag) ? 1 : 0),
        0,
      ),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.post.date.localeCompare(a.post.date);
    });

  return scored.slice(0, count).map((entry) => entry.post);
}
