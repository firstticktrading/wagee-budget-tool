# Wagee Budget Tool

Personal budgeting web app for one user (AUD, Australian tax law). Greenfield: as of this commit the repo holds only docs and skills config, with no app code yet.

Read these first, in order:

1. `docs/PRD.md`: the full spec (problem, 80 user stories, implementation and testing decisions, out of scope).
2. `docs/CONTEXT.md`: every decision made while designing it, the user's constraints, and what is deliberately excluded.
3. `docs/TICKETS.md`: the 13 GitHub issues, their blocking order, and where to start.

## Working rules

- **Never commit to `main`.** Work on feature branches off `main` and open a PR only when the owner asks. Cloud sessions are given a branch name; use it.
- **Nothing hard-coded.** Salary, tax brackets, Medicare, super, HELP, financial year, currency, timezone, pay frequency, savings goal, categories: all stored, user-editable settings. Defaults are seeded, never baked into logic.
- **Single user, multi-user-ready.** Every user-data row has an owning user and every query is scoped to the signed-in user.
- **Everything behind login.** Google sign-in only, restricted to an email allow-list from config; deny by default in production if unset.
- **No secrets in the repo.** Env vars only. Setup steps only the owner can do (Neon project, Google OAuth credentials, Vercel env vars) go in a README checklist.
- **Tax figures are estimates, not tax advice.** Verify the seeded 2026–27 rates against the ATO when building, and each July.
- Test the pure tax-engine and budget-math modules (the main seam) table-driven; use a few real-Postgres integration tests for scoping, category merge and idempotent scheduling.
- Tickets are in GitHub Issues with label `ready-for-agent`. Start from an unblocked ticket and respect "Blocked by".
