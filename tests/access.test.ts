import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { decideAccess } from "@/lib/access";

describe("request access policy", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ALLOWED_EMAILS", "me@example.com");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("redirects signed-out page requests to sign-in", () => {
    for (const pathname of ["/", "/settings", "/transactions/1"]) {
      expect(decideAccess({ pathname, email: null })).toEqual({ action: "redirect", to: "/signin" });
    }
  });

  it("returns 401 for signed-out API requests", () => {
    expect(decideAccess({ pathname: "/api/export", email: undefined })).toEqual({ action: "deny", status: 401 });
  });

  it("returns 403 for non-allow-listed API sessions", () => {
    expect(decideAccess({ pathname: "/api/export", email: "evil@example.com" })).toEqual({ action: "deny", status: 403 });
  });

  it("bounces non-allow-listed sessions off pages", () => {
    expect(decideAccess({ pathname: "/", email: "evil@example.com" })).toEqual({
      action: "redirect",
      to: "/signin?error=AccessDenied",
    });
  });

  it("denies everyone in production when no allow-list is set", () => {
    vi.stubEnv("ALLOWED_EMAILS", "");
    expect(decideAccess({ pathname: "/", email: "me@example.com" }).action).toBe("redirect");
    expect(decideAccess({ pathname: "/api/x", email: "me@example.com" })).toEqual({ action: "deny", status: 403 });
  });

  it("lets the allow-listed user through", () => {
    expect(decideAccess({ pathname: "/", email: "me@example.com" })).toEqual({ action: "allow" });
    expect(decideAccess({ pathname: "/api/anything", email: "ME@example.com" })).toEqual({ action: "allow" });
  });

  it("keeps sign-in and Auth.js endpoints reachable while signed out", () => {
    expect(decideAccess({ pathname: "/signin", email: null })).toEqual({ action: "allow" });
    expect(decideAccess({ pathname: "/api/auth/callback/google", email: null })).toEqual({ action: "allow" });
  });

  it("does not treat look-alike paths as public", () => {
    expect(decideAccess({ pathname: "/api/authx", email: null })).toEqual({ action: "deny", status: 401 });
    expect(decideAccess({ pathname: "/signin/../x", email: null }).action).toBe("redirect");
  });
});
