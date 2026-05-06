import { BlogCard } from "./BlogCard";
import type { BlogPost } from "@/lib/blog";

type Props = {
  posts: BlogPost[];
};

export function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 border-t border-line-soft pt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-[26px] font-semibold leading-tight text-ink sm:text-[30px]">
          More from the Ordron Insights catalogue
        </h2>
        <p className="text-[13px] text-ink-muted">
          Selected by topic. Updated as the agent publishes.
        </p>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
