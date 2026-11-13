# Context and decisions

Written at the end of the design session so a fresh session can pick up without the chat history. The PRD (`PRD.md`) is the spec; this file records the reasoning, the user's own words and preferences, and the rejected options.

## The user and the goal

- Starting a new job on a Monday in November 2026 at **$59,000 a year pre-tax (AUD)**.
- Wants to **save about $15–20k a year**. On roughly $49k net that is about 31–41% of take-home pay, which is very tight, so the app must make the tension visible and never hide it.
- Also has **a side hustle, commission income, and projects** that earn a little money now and will be expanded over time.
- Wants it **easy to use and not hard-coded**: able to change salary, expenses, income, and how both are categorised. Open to extra features.
- Purpose of the project income feature: **categorise the pay**, not plan or fund future projects. The user explicitly said the app does not need to help plan projects (no target cost, deadline or affordability features).

## Decisions (final, confirmed by the user)

| Topic | Decision |
|---|---|
| Platform | Web app, mobile-first, installable PWA, dark mode |
| Hosting and data | **Vercel + Neon Postgres** (free tiers). User chose this over local-only storage |
| Stack | Next.js (App Router) + TypeScript, Drizzle ORM with committed migrations, zod, Tailwind, Recharts. User asked to discuss the stack once Vercel and Neon were chosen; this was proposed and accepted |
| Login | **Google sign-in** (Auth.js), single user, email allow-list, multi-user-ready schema |
| Tax | Australian resident rates, **2026–27 financial year**, editable tax tables, 2% Medicare levy, super 12% on top. Assumed: resident, tax-free threshold claimed, no HELP debt, all as toggles |
| Super | A **tick** states whether the entered salary includes super. Super is shown separately and excluded from take-home pay |
| Side hustle tax | **Per-source toggle to switch tax calculation off.** Treatments: payroll-withheld, no-tax-withheld (shows a set-aside estimate), already-net |
| Commission | Defaults to payroll-withheld. Side hustle and projects default to no tax withheld |
| Income model | Multiple income sources (salary, commission, side hustle, one-off), each with frequency, gross or net, category |
| Categories | Fully user-editable with sub-categories, need/want tag, optional monthly limit |
| Expenses | Recurring (auto-scheduled, confirm or amend actual) and one-off |
| Projects | A **tag** on income and expenses giving profit per project, with optional suggested splits (reinvest, tax set-aside, personal savings). Suggestions only, never automatic |
| Budget method | **Pay yourself first**: savings goal comes off net income first |
| Savings goal | Editable dollar amount or percentage, live on-track tracking |
| Period | Calendar month default, weekly or fortnightly toggle |
| Pay frequency | Fortnightly default. **First payday left blank**: the user does not know it yet |
| Dashboard | Net vs expenses, on-track, category chart, income-by-source chart, safe-to-spend this week, what-if slider |
| Locale | AUD, Australia/Sydney timezone, 1 Jul–30 Jun financial year, all as settings |
| Backup | CSV and JSON export, monthly reminder. Free tiers accepted |
| Build approach | **One build, no phases**, though delivered as tracer-bullet tickets (see `TICKETS.md`) |
| Git workflow | **Feature branches off `main`, merge by PR when the owner asks.** Never commit to `main` directly |

## Explicitly out of scope

- Any bank connection (the user does not want one).
- **Bank CSV import, import rules and duplicate detection.** This was proposed and the user declined it.
- Savings-bucket or project-planning features.
- Receipt photos, push notifications, multi-currency, shared or household budgets.
- Lodging tax, BAS or GST returns.

## Tax notes for whoever builds the engine

- Financial year runs 1 July to 30 June. Today in the project is November 2026, so the current year is 2026–27.
- Resident brackets for 2026–27 are expected to be: nil to $18,200; 15% from $18,201 to $45,000 (the Stage 3 rate drops from 16% to 15% on 1 July 2026 and to 14% on 1 July 2027); 30% from $45,001 to $135,000; 37% from $135,001 to $190,000; 45% above $190,000. **Verify against the ATO before seeding**, and store the tables as editable settings.
- Medicare levy 2% of taxable income (low-income thresholds apply).
- Super guarantee 12% from 1 July 2025.
- Rough check: $59k gross is about $49k net after income tax and Medicare.
- Tax on combined income is computed once, then apportioned to sources by share of gross, so side income's marginal effect shows up. The GST registration threshold is $75,000 turnover and should be a setting.

## Process history

- The design was settled through three rounds of grilling (decisions above), then written up as `PRD.md`.
- An initial attempt to scaffold the app was interrupted by the user before it ran, who asked for a PRD and GitHub issues first. **No app code has been written.** The planned first step is ticket #2.
- Tracker is GitHub Issues on this repo. Label used: `ready-for-agent`. Blocking edges are written as text in each ticket because the available tooling had no native blocking links; each ticket is also a sub-issue of the spec issue (#1).

## Setup the owner must do themselves

These cannot be done by an agent and belong in the README checklist (ticket #2):

1. Create a Neon project and copy the connection string.
2. Create Google OAuth credentials (client ID and secret) with the Vercel and local callback URLs.
3. Create the Vercel project from this repo and set env vars: database URL, auth secret, Google client ID and secret, and the allowed-emails list.
