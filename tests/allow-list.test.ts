import { describe, expect, it } from "vitest";
import { isEmailAllowed, parseAllowList } from "@/lib/allow-list";

describe("isEmailAllowed", () => {
  const cases: [string, string | null | undefined, { ALLOWED_EMAILS?: string; NODE_ENV?: string }, boolean][] = [
    ["listed email in production", "me@example.com", { ALLOWED_EMAILS: "me@example.com", NODE_ENV: "production" }, true],
    ["case/whitespace insensitive", " Me@Example.com ", { ALLOWED_EMAILS: "ME@example.com, b@x.com", NODE_ENV: "production" }, true],
    ["unlisted email", "evil@example.com", { ALLOWED_EMAILS: "me@example.com", NODE_ENV: "production" }, false],
    ["no list in production denies everyone", "me@example.com", { NODE_ENV: "production" }, false],
    ["empty list in production denies everyone", "me@example.com", { ALLOWED_EMAILS: " , ", NODE_ENV: "production" }, false],
    ["no list in development allows", "me@example.com", { NODE_ENV: "development" }, true],
    ["missing email", undefined, { ALLOWED_EMAILS: "me@example.com" }, false],
    ["null email", null, { NODE_ENV: "development" }, false],
  ];
  it.each(cases)("%s", (_n, email, env, expected) => {
    expect(isEmailAllowed(email, env)).toBe(expected);
  });

  it("parses and de-duplicates", () => {
    expect(parseAllowList("A@x.com,a@x.com, b@x.com")).toEqual(["a@x.com", "b@x.com"]);
  });
});
