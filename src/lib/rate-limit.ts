/*
  In-memory fixed-window rate limiter.

  Good enough for single-instance dev, QA, and low-traffic preview
  deployments. Because state lives in a module-level Map it resets on
  every cold start and is not shared across serverless instances, so
  swap this for `@upstash/ratelimit` (or equivalent) before the site
  scales to multi-instance production traffic.
*/

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetAt: number;
};

export type RateLimitOptions = {
  /** Maximum number of requests allowed per window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
};

/**
 * Check and increment the bucket for `key`. Returns `ok: false` when
 * the caller has exhausted their allowance for the current window.
 */
export function checkRateLimit(
  key: string,
  opts: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    const resetAt = now + opts.windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: opts.limit - 1, resetAt };
  }

  if (bucket.count >= opts.limit) {
    return { ok: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return {
    ok: true,
    remaining: opts.limit - bucket.count,
    resetAt: bucket.resetAt,
  };
}

/**
 * Best-effort client IP from common proxy headers, falling back to a
 * stable placeholder so the limiter never bails on a missing header.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
