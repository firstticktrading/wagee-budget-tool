import { auth, signOut } from "@/auth";

export const dynamic = "force-dynamic";

const NAV = ["Home", "Transactions", "Income", "Categories", "Settings"];

export default async function HomePage() {
  const session = await auth();
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col">
      <header className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
        <h1 className="text-lg font-semibold">Wagee</h1>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/signin" });
          }}
        >
          <button className="text-sm underline" type="submit">
            Sign out ({session?.user?.email})
          </button>
        </form>
      </header>
      <main className="flex-1 p-4">
        <p className="text-slate-600 dark:text-slate-400">
          Nothing here yet. Your budget will appear on this page.
        </p>
      </main>
      <nav className="sticky bottom-0 flex justify-around border-t border-slate-200 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-950">
        {NAV.map((n) => (
          <span key={n} className={n === "Home" ? "font-semibold" : "text-slate-500"}>
            {n}
          </span>
        ))}
      </nav>
    </div>
  );
}
