import { signIn } from "@/auth";

export const dynamic = "force-dynamic";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Wagee</h1>
      {error && (
        <p role="alert" className="rounded bg-red-100 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
          {error === "AccessDenied" || error === "Callback"
            ? "That Google account isn't allowed to sign in."
            : "Sign-in failed. Please try again."}
        </p>
      )}
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <button className="w-full rounded bg-slate-900 p-3 text-white dark:bg-slate-100 dark:text-slate-900" type="submit">
          Sign in with Google
        </button>
      </form>
    </main>
  );
}
