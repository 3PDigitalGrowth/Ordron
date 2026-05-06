import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";

type Props = {
  post: BlogPost;
  /**
   * "feature" gives the most recent post a wider tile on the index.
   * Default tiles render in a 3-up grid.
   */
  variant?: "default" | "feature";
};

const monthYearFormatter = new Intl.DateTimeFormat("en-AU", {
  month: "short",
  year: "numeric",
});

function formatDate(value: string): string {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return monthYearFormatter.format(parsed);
}

export function BlogCard({ post, variant = "default" }: Props) {
  const isFeature = variant === "feature";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow duration-200 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
        isFeature && "lg:flex-row lg:items-stretch",
      )}
    >
      {post.heroImage && (
        <div
          className={cn(
            "relative aspect-[16/9] w-full overflow-hidden bg-surface-2",
            isFeature && "lg:aspect-auto lg:h-auto lg:w-1/2",
          )}
        >
          <Image
            src={post.heroImage}
            alt=""
            fill
            sizes={isFeature ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}

      <div
        className={cn(
          "flex flex-1 flex-col gap-4 p-6 sm:p-7",
          isFeature && "lg:p-9",
        )}
      >
        {post.primaryKeyword && (
          <span className="inline-flex w-fit items-center rounded-full bg-teal/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-teal">
            {post.primaryKeyword}
          </span>
        )}
        <h3
          className={cn(
            "font-display font-semibold leading-tight text-ink",
            isFeature ? "text-[26px] sm:text-[30px]" : "text-[20px] sm:text-[22px]",
          )}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-[15px] leading-relaxed text-ink-soft">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center gap-3 text-[12.5px] text-ink-muted">
          {post.date && <span>{formatDate(post.date)}</span>}
          {post.date && post.readTime && (
            <span aria-hidden="true" className="text-ink-faint">
              &middot;
            </span>
          )}
          {post.readTime && <span>{post.readTime}</span>}
        </div>
      </div>
    </Link>
  );
}
