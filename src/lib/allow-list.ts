/** Parse a comma-separated email list into normalised, de-duplicated entries. */
export function parseAllowList(raw: string | undefined): string[] {
  if (!raw) return [];
  return [...new Set(raw.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean))];
}

/**
 * Is this email allowed to sign in?
 * - With a list configured: only listed emails.
 * - With no list: denied in production, allowed elsewhere (local dev convenience).
 */
export function isEmailAllowed(
  email: string | null | undefined,
  env: { ALLOWED_EMAILS?: string; NODE_ENV?: string } = process.env,
): boolean {
  if (!email) return false;
  const list = parseAllowList(env.ALLOWED_EMAILS);
  if (list.length === 0) return env.NODE_ENV !== "production";
  return list.includes(email.trim().toLowerCase());
}
