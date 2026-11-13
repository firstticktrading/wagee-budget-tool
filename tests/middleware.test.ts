import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

// Replace Auth.js's session lookup so we can drive the real middleware with real requests.
let sessionEmail: string | null = null;
vi.mock("@/auth", () => ({
  auth: (handler: (req: unknown) => Response) => (req: NextRequest) =>
    handler(Object.assign(req, { auth: sessionEmail ? { user: { email: sessionEmail } } : null })),
}));

const { default: middleware } = await import("@/middleware");
const call = (path: string) =>
  (middleware as unknown as (r: NextRequest) => Response)(new NextRequest(`https://app.test${path}`));

describe("middleware (request level)", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ALLOWED_EMAILS", "me@example.com");
    sessionEmail = null;
  });
  afterEach(() => vi.unstubAllEnvs());

  it("redirects an unauthenticated page request to /signin", () => {
    const res = call("/");
    expect(res.status).toBe(307);
    expect(new URL(res.headers.get("location")!).pathname).toBe("/signin");
  });

  it("rejects an unauthenticated API request with 401 and no data", async () => {
    const res = call("/api/export");
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Unauthorized" });
  });

  it("rejects a non-allow-listed session with 403", () => {
    sessionEmail = "evil@example.com";
    expect(call("/api/export").status).toBe(403);
  });

  it("passes an allow-listed session through", () => {
    sessionEmail = "me@example.com";
    const res = call("/");
    expect(res.status).toBe(200);
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });
});
