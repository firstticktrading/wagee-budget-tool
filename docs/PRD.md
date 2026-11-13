# PRD: Wagee Budget Tool

A personal budgeting web app that helps one person track income and expenses, understand their real after-tax position under Australian tax law, and save $15–20k a year on a $59k pre-tax salary, while keeping side-hustle, commission and project income categorised.

## Problem Statement

I am starting a new job paying $59,000 a year pre-tax (AUD). I want to save $15,000–$20,000 a year, which is roughly 31–41% of my take-home pay, so there is very little room for guesswork. I also earn irregular money from a side hustle, commission and projects I am growing, and I cannot tell how much of that is really mine after tax, how much to reinvest in each project, or whether I am on track to hit my savings target.

Existing budgeting tools either hard-code assumptions (a single salary, fixed categories, US tax), force a bank connection I do not want, or treat all income as one lump. I need something where nothing is hard-coded: salary, tax settings, categories, income sources and expenses are all things I can change at any time.

## Solution

A mobile-first web app, installable to the phone home screen, behind Google sign-in and backed by a hosted database. I describe my income sources (salary, commission, side hustle, one-offs) and my expenses (recurring bills and one-off spending), organised into categories I fully control. The app applies editable Australian tax rules to show net pay, estimates the tax I should set aside on income with no tax withheld, and works "pay yourself first": my savings goal comes off net income first and the remainder is what I can spend.

The home screen tells me, in plain terms, whether I am on track, how much I can safely spend this week, where money is going by category and by income source, and what each of my projects is earning. A what-if slider lets me test a raise or a new subscription before committing to it. I can export everything at any time as a backup.

## User Stories

### Account and access

1. As the owner, I want to sign in with my Google account, so that I do not manage another password.
2. As the owner, I want every page and API to require sign-in, so that my financial data is never visible to the public.
3. As the owner, I want to restrict sign-in to my own Google account, so that nobody else who finds the URL can create an account.
4. As the owner, I want to sign out, so that I can secure a shared device.
5. As a future second user, I want my data kept separate from everyone else's, so that opening the app up later does not need a rewrite.

### Settings and tax

6. As a worker, I want to enter my gross salary and say whether it includes super, so that net pay is calculated correctly.
7. As a worker, I want superannuation shown separately from take-home pay, so that I do not budget money I cannot spend.
8. As a worker, I want the income tax brackets, Medicare levy rate and super rate stored as editable settings, so that I can update them each financial year without a code change.
9. As a worker, I want the app pre-filled with current Australian resident rates for the 2026–27 financial year, so that I do not start from a blank table.
10. As a worker, I want toggles for resident status, tax-free threshold, HELP/HECS debt and Medicare levy, so that the calculation fits my situation.
11. As a worker, I want to see my net pay per year, month, fortnight and week, so that I can plan at whatever cadence suits me.
12. As a worker, I want to change my salary at any time (for example a raise) and see every figure update, so that the app keeps up with my life.
13. As a worker, I want to set my pay frequency and, when I know it, my first payday, so that scheduled pay lands on the right dates.
14. As a worker, I want to leave the first payday blank until I know it, so that I am not forced to guess.
15. As a user, I want currency (AUD), timezone and the 1 July–30 June financial year to be settings and not hard-coded, so that the app is not locked to my current situation.
16. As a user, I want dark mode, so that the app is comfortable at night.

### Savings goal

17. As a saver, I want to set my savings goal as a yearly dollar amount or as a percentage of net income, so that I can think about it the way I prefer.
18. As a saver, I want to change the goal at any time, so that I can adjust as I learn what is realistic.
19. As a saver, I want to see my goal expressed per year, month, fortnight and week, so that it feels concrete.
20. As a saver, I want to see "on track" or "behind by $X" against my goal, so that I know where I stand without doing maths.
21. As a saver, I want a projected year-end savings figure, so that I can see where current habits lead.
22. As a saver, I want a clear warning when my fixed costs alone make the goal impossible, so that I can fix the root cause.
23. As a saver, I want the maximum I can spend per week or month to still hit my goal, so that I have a number to live by.

### Income sources

24. As someone with several income streams, I want to define multiple income sources (salary, commission, side hustle, one-off), so that each is tracked separately.
25. As a user, I want each source to have a name, type, amount, frequency (weekly, fortnightly, monthly, quarterly, annual, one-off, irregular) and category, so that it is described accurately.
26. As a user, I want to say whether a source's amount is gross or net, so that tax is not applied twice.
27. As a user, I want to choose a tax treatment per source (tax withheld by payroll, no tax withheld, or already net), so that the app models how I am really paid.
28. As a user, I want commission to default to payroll-withheld and side hustle and project income to default to no tax withheld, so that setup is quick.
29. As a user, I want to switch tax calculation off for a specific source such as a side hustle, so that the app does not estimate tax I do not want it to.
30. As a user, I want a "set aside $X for tax" amount for each payment on a no-tax-withheld source, so that I am not surprised at tax time.
31. As a user, I want that estimate to account for my other income, so that the marginal rate is realistic.
32. As a user, I want a warning when my turnover approaches the GST registration threshold, so that I do not miss an obligation.
33. As a user, I want to add, edit, pause and delete income sources, so that the list stays accurate.
34. As a user, I want to log an irregular payment (a commission payout, a side-hustle invoice) in a few seconds, so that I actually record it.

### Categories

35. As a user, I want sensible default categories on first use, so that I can start immediately.
36. As a user, I want to create, rename, recolour, merge, archive and delete categories, so that nothing is fixed.
37. As a user, I want sub-categories, so that I can group related spending.
38. As a user, I want to tag a category as a need or a want, so that I can see that split.
39. As a user, I want to set an optional monthly limit per category, so that I get early warning when I overspend.
40. As a user, I want separate categories for income and for expenses, so that reports make sense.
41. As a user, I want merging two categories to move all their history onto the survivor, so that I do not lose data.
42. As a user, I want deleting a category that has history to require choosing a replacement, so that nothing is orphaned.

### Expenses and transactions

43. As a user, I want to quick-add an expense (amount, category, date, note) in under five seconds on my phone, so that logging is not a chore.
44. As a user, I want the date to default to today and the last-used category to be one tap away, so that entry is fast.
45. As a user, I want to define recurring expenses (rent, phone, subscriptions) once with a frequency, so that I do not re-enter them.
46. As a user, I want to mark each expense fixed or variable, so that I can see what is flexible.
47. As a user, I want recurring items to appear automatically as scheduled entries on their due dates, so that my month is pre-populated.
48. As a user, I want to confirm a scheduled entry or change it to the actual amount, so that real life overrides the plan.
49. As a user, I want to skip a single occurrence of a recurring item, so that a one-off exception does not break the pattern.
50. As a user, I want to pause or end a recurring item, so that cancelled subscriptions stop appearing.
51. As a user, I want to edit and delete any transaction, so that I can fix mistakes.
52. As a user, I want to search and filter transactions by date, category, project, source and amount, so that I can find things.
53. As a user, I want scheduled and confirmed entries clearly distinguished, so that I know what has actually happened.

### Projects

54. As a builder, I want to create projects and tag any income or expense with one, so that I can see each project's finances.
55. As a builder, I want per-project income, costs and profit, so that I know which projects earn their keep.
56. As a builder, I want to set suggested split percentages for a project's income (reinvest, tax set-aside, personal savings), so that I can decide where each payment goes.
57. As a builder, I want the split shown as a suggestion on each project payment and never applied automatically, so that I stay in control.
58. As a builder, I want to see how much a project has returned to me versus how much I have reinvested, so that I can judge growth.
59. As a builder, I want to archive a finished project without losing its history, so that old data stays available.

### Dashboard and reporting

60. As a user, I want the home screen to show this month's net income versus expenses, so that I see the headline instantly.
61. As a user, I want a "safe to spend this week" figure, so that I can make day-to-day decisions.
62. As a user, I want spending by category as a chart, so that I can see where money goes.
63. As a user, I want income by source as a chart, so that I can see how diversified I am.
64. As a user, I want to switch between calendar month and weekly or fortnightly views, so that I can match my pay cycle.
65. As a user, I want to navigate to previous and future months, so that I can review history and look ahead.
66. As a user, I want category limits to show progress and turn visibly warning when exceeded, so that I notice overspending.
67. As a user, I want the needs versus wants split shown, so that I can judge my discretionary spending.
68. As a user, I want year-to-date totals for the financial year, so that I can see the bigger picture.

### What-if

69. As a planner, I want a slider for a raise or pay cut, so that I can see the effect on take-home pay and savings.
70. As a planner, I want to add a hypothetical recurring expense, so that I can see whether I can afford it before signing up.
71. As a planner, I want what-if changes to never alter my real data, so that experimenting is safe.
72. As a planner, I want the what-if result to show the change in projected yearly savings against my goal, so that the trade-off is obvious.

### Data ownership

73. As the owner, I want to export all my data as CSV and JSON in one click, so that I have a backup I control.
74. As the owner, I want a monthly reminder to export, so that I keep a backup even on free hosting.
75. As the owner, I want to delete all my data, so that I can start fresh or leave cleanly.

### Quality

76. As a phone user, I want every screen usable one-handed on a small screen, so that I can log spending anywhere.
77. As a user, I want the app installable to my home screen, so that it opens like a native app.
78. As a user, I want money amounts always shown in AUD with two decimals, so that figures are unambiguous.
79. As a user, I want sensible empty states that tell me what to do first, so that a blank app is not confusing.
80. As a user, I want validation errors that explain what to fix, so that I am never stuck.

## Implementation Decisions

- **Hosting and data:** the app is hosted on Vercel with a Neon Postgres database. The free tiers are acceptable. The database may take a moment to wake after inactivity, and backup history is short, so export is the real backup.
- **Stack:** a single full-stack TypeScript web app (Next.js, App Router), server-side data access with a typed ORM (Drizzle), schema changes via committed migrations, validation of all inputs with a schema validator (zod), Tailwind for styling, Recharts for charts, mobile-first and installable as a PWA, with dark mode.
- **Authentication:** Google sign-in only. Every route and server action requires a session. Sign-in is limited to an allow-list of email addresses supplied by configuration, defaulting to deny when unset in production. The schema is multi-user-ready: every row of user data carries the owning user, and every query is scoped to the signed-in user.
- **Nothing hard-coded:** tax brackets, Medicare rate, super rate, HELP rates, financial-year boundaries, currency, timezone, pay frequency and savings goal are all stored settings. Defaults are seeded for the 2026–27 Australian resident rates on first use and verified against the ATO at build time. Updating a tax year is a settings edit.
- **Tax engine:** a pure module that takes annualised taxable income and settings and returns income tax, Medicare levy, HELP repayment and net income. Salary stated including super is converted to the ex-super base using the super rate. Super is reported separately and excluded from take-home pay. Tax on combined income is computed once across all taxable sources and apportioned to sources by their share of gross, so marginal effects of side income are reflected.
- **Tax treatments per source:** payroll-withheld (tax already deducted before the money arrives), no-tax-withheld (the app shows a set-aside estimate at the marginal rate), and already-net (no tax calculation). Each source has an independent toggle to disable tax estimation entirely.
- **GST threshold:** a warning compares trailing twelve-month turnover from no-tax-withheld business income to a configurable threshold.
- **Income model:** an income source defines a stream (type, amount, gross or net, frequency, tax treatment, category, optional project). Regular sources generate scheduled transactions. Irregular and one-off income is logged directly as transactions.
- **Expense model:** recurring expenses define a template (amount, frequency, category, fixed or variable, optional project). Occurrences are materialised as scheduled transactions on their due dates, are idempotent (re-running never duplicates), and can be confirmed, amended, skipped or deleted individually. Transactions are either scheduled or confirmed, and only confirmed ones count as actuals.
- **Categories:** user-owned, typed as income or expense, with optional parent, colour, need/want tag and optional monthly limit. Merge reassigns history atomically. Delete with history requires a replacement. Archive hides without deleting.
- **Projects:** a tag on income and expense transactions and on sources. Project reporting derives income, costs and profit from tagged transactions. Split percentages are stored per project and rendered as suggestions only.
- **Budgeting method:** pay yourself first. Monthly spendable amount is net income minus the savings goal. "Safe to spend this week" is the spendable amount minus fixed obligations remaining and variable spend so far, divided over the remaining weeks. Projected year-end savings combines year-to-date actuals with projected remaining income and spending.
- **Budget math module:** a pure module covering annualisation of frequencies, occurrence generation between dates, period totals, projections, safe-to-spend, savings progress and the what-if transformation. What-if applies a hypothetical change to a copy of the inputs and never touches stored data.
- **Pay cycle:** pay frequency is a setting; the first payday is optional and blank by default. Until it is set, regular salary shows in period totals but is not placed on specific dates.
- **Views:** calendar month is the default period, with a weekly or fortnightly toggle and month navigation.
- **Export:** a single endpoint returns the signed-in user's complete data as JSON and per-table CSV. A reminder surfaces monthly. A delete-all-data action exists.
- **Money handling:** amounts are stored as fixed-precision decimals and handled without floating-point drift in totals; display is AUD with two decimals.

## Testing Decisions

- A good test exercises external behaviour through a module's public interface with realistic inputs and asserts on outputs a user would care about (net pay, set-aside amount, safe-to-spend). Tests do not assert on internal helpers or data structures.
- **Highest seam:** the pure tax engine and budget math modules, tested with table-driven cases. This is the one primary seam. Because these modules take plain data in and return plain data out, nearly all business rules are verifiable without a database or browser.
- Tax engine cases include: boundary incomes at each bracket edge, the tax-free threshold, Medicare levy toggle, super included versus excluded, HELP toggle, combined salary plus no-withheld side income, and salary changes.
- Budget math cases include: each frequency's annualisation, occurrence generation across month and financial-year boundaries, skipped and amended occurrences, idempotent re-generation, safe-to-spend with varying remaining weeks, projection with no data yet, and what-if leaving inputs unmodified.
- A small number of integration tests cover the data layer against a real Postgres-compatible database: user scoping (one user never sees another's rows), category merge, delete-with-replacement, and idempotent scheduled generation.
- Authentication and allow-list behaviour is tested at the request boundary: unauthenticated requests are rejected, and a non-allow-listed Google account cannot sign in.
- No prior art exists in this repository, so these tests establish the conventions.

## Out of Scope

- Bank connections of any kind.
- Bank CSV import, import rules and duplicate detection.
- Savings-bucket or project-planning features (target cost, deadline, affordability dates).
- Receipt photos or attachments.
- Push notifications (a monthly in-app export reminder is the only reminder).
- Multi-currency.
- Shared or household budgets.
- Filing or lodging tax, BAS or GST returns. Tax figures are estimates, not tax advice.

## Further Notes

- Savings math reality check: about $49k net on $59k gross means a $15–20k goal is roughly 31–41% of take-home pay. The app should make that tension visible, not hide it.
- Tax rates change each year. Defaults must be verified against the ATO when the app is built and again each July.
- All work happens on feature branches off the main branch and merges by pull request when asked. Nothing is committed straight to main.
- Seeded categories and tax defaults are starting points only and must remain fully editable.
