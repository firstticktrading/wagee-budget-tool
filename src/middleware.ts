import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { decideAccess } from "@/lib/access";

export default auth((req) => {
  const decision = decideAccess({
    pathname: req.nextUrl.pathname,
    email: req.auth?.user?.email,
  });
  if (decision.action === "redirect") {
    return NextResponse.redirect(new URL(decision.to, req.nextUrl.origin));
  }
  if (decision.action === "deny") {
    return NextResponse.json({ error: decision.status === 401 ? "Unauthorized" : "Forbidden" }, { status: decision.status });
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
