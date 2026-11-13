import path from "node:path";
import { describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { getTableConfig } from "drizzle-orm/pg-core";
import * as schema from "@/db/schema";
import { users } from "@/db/schema";

describe("database schema", () => {
  it("migrations apply cleanly to an empty database", async () => {
    const db = drizzle(new PGlite(), { schema });
    await migrate(db, { migrationsFolder: path.resolve(import.meta.dirname, "../drizzle") });
    await db.insert(users).values({ email: "a@example.com" });
    expect(await db.select().from(users)).toHaveLength(1);
  });

  it("emails are unique", async () => {
    const db = drizzle(new PGlite(), { schema });
    await migrate(db, { migrationsFolder: path.resolve(import.meta.dirname, "../drizzle") });
    await db.insert(users).values({ email: "a@example.com" });
    await expect(db.insert(users).values({ email: "a@example.com" })).rejects.toThrow();
  });

  it("every user-data table has an owning user_id", () => {
    const tables = Object.values(schema).filter((v) => typeof v === "object" && v !== null && "_" in (v as object));
    for (const t of tables) {
      const cfg = getTableConfig(t as Parameters<typeof getTableConfig>[0]);
      if (cfg.name === "users") continue;
      expect(cfg.columns.map((c) => c.name), `${cfg.name} needs user_id`).toContain("user_id");
    }
  });
});
