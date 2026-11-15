---
name: website-rework-toolkit
description: Set up or audit the portable design, copywriting, content strategy, site architecture, SEO, security, Playwright, and browser-UAT skill catalog used for website redesigns. Use when preparing Claude Code, Codex, or Kiro for a full website rework or installing one of the catalog profiles.
license: MIT
metadata:
  author: PlusPioneers
  version: "1.0.0"
---

# Website rework toolkit

Use the source-pinned catalog to prepare an agent workspace for website redesign and verification.

## Workflow

1. Read `references/catalog.json`. Select the smallest profile that covers the request:
   - `design`: visual direction, image-to-code, interface guidelines, and browser tooling.
   - `content`: product marketing, copy, content strategy, site architecture, and search optimization.
   - `quality`: security review, Playwright, interface guidelines, and browser UAT.
   - `full`: the complete website-rework stack.
2. Run `node scripts/catalog.mjs list --profile <profile>` to show what the profile contains.
3. Run `node scripts/catalog.mjs plan --profile <profile> --agents <comma-separated-agents> [--global]` and present the exact pinned sources and commands.
4. Inspect existing skill locations and omit skills already present at the requested or newer reviewed version. Never overwrite local modifications silently.
5. Obtain explicit approval immediately before downloading or installing external skills.
6. After approval, run `node scripts/catalog.mjs install --profile <profile> --agents <comma-separated-agents> [--global] --apply`.
7. Restart or begin a fresh agent session, then verify that each selected skill is discoverable. Report installed skills, skipped skills, failures, target clients, and rollback paths.

## Rules

- Supported agent identifiers are `claude-code`, `codex`, and `kiro-cli`.
- Keep third-party skills pinned to the commits in the catalog. Do not switch to an unreviewed branch head during installation.
- The catalog is an installer index, not a claim that every skill behaves identically on all agents.
- Do not install the `full` profile when a narrower profile is sufficient.
- Do not vendor or republish upstream skill contents. Install from the recorded source repository and preserve its license.
- `awesome-design-md` is a reference collection, not an executable Agent Skill. Do not pass it to the installer.
- Never store credentials, cookies, API keys, or provider tokens in the catalog or workspace.
- No commits, pushes, deployments, or global installs are implied by a request to inspect or plan the catalog.
