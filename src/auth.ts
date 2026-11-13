import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { isEmailAllowed } from "@/lib/allow-list";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt" },
  pages: { signIn: "/signin", error: "/signin" },
  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email?.toLowerCase();
      if (!email || profile?.email_verified !== true) return false;
      if (!isEmailAllowed(email)) return false;

      // Create or match the user record on sign-in.
      const db = getDb();
      await db
        .insert(users)
        .values({
          email,
          name: profile.name ?? null,
          image: typeof profile.picture === "string" ? profile.picture : null,
          googleSub: profile.sub ?? null,
        })
        .onConflictDoUpdate({
          target: users.email,
          set: {
            name: profile.name ?? null,
            image: typeof profile.picture === "string" ? profile.picture : null,
            googleSub: profile.sub ?? null,
          },
        });
      return true;
    },
    async jwt({ token, profile }) {
      // On first sign-in `profile` is present: attach our internal user id.
      if (profile?.email) {
        const [row] = await getDb()
          .select({ id: users.id })
          .from(users)
          .where(eq(users.email, profile.email.toLowerCase()))
          .limit(1);
        if (row) token.userId = row.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userId && session.user) session.user.id = token.userId as string;
      return session;
    },
  },
});
