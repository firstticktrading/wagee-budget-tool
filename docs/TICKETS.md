# Tickets

Source of truth is GitHub Issues. This is a snapshot so the dependency order is visible in the repo. All carry the label `ready-for-agent` and are sub-issues of the spec, issue #1.

Repo: https://github.com/firstticktrading/wagee-budget-tool

| # | Ticket | Blocked by |
|---|---|---|
| 1 | Spec: Wagee Budget Tool (copy of `PRD.md`) | n/a |
| 2 | Foundation and Google sign-in on Vercel | none |
| 3 | Tax engine and editable settings with net pay | 2 |
| 4 | Fully editable categories | 2 |
| 5 | PWA install, dark mode and mobile polish | 2 |
| 6 | Quick-add expenses and transactions list | 4 |
| 7 | Income sources with tax treatment | 3, 4 |
| 8 | Savings goal and basic dashboard | 6, 7 |
| 9 | Recurring items and scheduled entries | 6, 7 |
| 10 | Projects: tags, profit per project and suggested splits | 6, 7 |
| 11 | Tax set-aside estimates and GST warning | 7 |
| 12 | Export, monthly backup reminder and delete-all | 6, 7 |
| 13 | Safe-to-spend, projections and category limits | 8, 9 |
| 14 | What-if simulator | 13 |

## Where to start

**Ticket #2** is the only one with no blockers. When it is done, #3, #4 and #5 can proceed in parallel; #3 and #4 gate most of the rest.

## Suggested order

2 → (3, 4, 5) → (6, 7) → (8, 9, 10, 11, 12) → 13 → 14

## Notes

- Each ticket is a vertical slice (schema, API, UI, tests) and should be demoable on its own.
- The pure tax engine (ticket #3) and budget-math modules (tickets #8, #9, #13) are the project's main test seam. Build them as plain functions that take data in and return data out.
- Keep this table in sync if tickets are added, split or merged.
