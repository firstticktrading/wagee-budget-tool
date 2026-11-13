import { isEmailAllowed } from "./allow-list";

export type AccessDecision =
  | { action: "allow" }
  | { action: "redirect"; to: string }
  | { action: "deny"; status: 401 | 403 };

const PUBLIC_PATHS = ["/signin"];

/**
 * Pure access policy for every request. Signed-out visitors and non-allow-listed
 * sessions get nothing (API → 401/403, pages → redirect to sign-in).
 * Only the sign-in page and Auth.js endpoints are reachable signed out.
 */
export function decideAccess(input: {
  pathname: string;
  email: string | null | undefined;
}): AccessDecision {
  const { pathname, email } = input;
  const isAuthRoute = pathname === "/api/auth" || pathname.startsWith("/api/auth/");
  if (isAuthRoute) return { action: "allow" };

  const isApi = pathname === "/api" || pathname.startsWith("/api/");
  const signedIn = Boolean(email);
  const allowed = isEmailAllowed(email);

  if (PUBLIC_PATHS.includes(pathname)) {
    // A signed-in, allowed user has no business on the sign-in page.
    return signedIn && allowed ? { action: "redirect", to: "/" } : { action: "allow" };
  }
  if (!signedIn) {
    return isApi ? { action: "deny", status: 401 } : { action: "redirect", to: "/signin" };
  }
  if (!allowed) {
    return isApi
      ? { action: "deny", status: 403 }
      : { action: "redirect", to: "/signin?error=AccessDenied" };
  }
  return { action: "allow" };
}
