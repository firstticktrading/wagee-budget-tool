import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Convention: every user-data table added from here on MUST have a
 * `user_id` column referencing `users.id` (enforced by tests/schema.test.ts),
 * and every query must be scoped by it.
 */
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  image: text("image"),
  googleSub: text("google_sub").unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
