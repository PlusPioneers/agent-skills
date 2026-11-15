---
name: ai-coding-toolkit-setup
description: Safely assess, install, configure, update, or remove FreeLLM API, Ponytail, Claude-Mem, Agent Reach, and NVIDIA SkillSpector for Claude Code, Codex, and Kiro. Use when a user asks to set up the five-tool AI coding toolkit, compare its client compatibility or cost, or repair an existing installation.
license: MIT
metadata:
  author: PlusPioneers
  version: "1.0.0"
---

# AI coding toolkit setup

Set up only the tools the user requests and only on clients they actually use. These five projects are different kinds of software; do not describe all of them as plugins.

## Workflow

1. Read [references/tools.md](references/tools.md) before recommending or installing anything. Treat its compatibility matrix as a minimum, then re-check the linked official README when current behavior matters.
2. Run `node scripts/detect-environment.mjs` from this skill directory. Report which clients and prerequisites are present. "GPT" is ambiguous: ask whether it means Codex CLI/IDE or ChatGPT only if the distinction changes the setup.
3. Inspect existing project and user configuration before proposing edits. Preserve unrelated entries and never replace whole JSON files merely to add one MCP server.
4. Present a plan that separates:
   - native, documented integrations;
   - portable CLI or MCP use;
   - manual or unverified adapters.
5. Obtain explicit approval immediately before installing packages, cloning repositories, editing user-level configuration, starting background services, or accessing browser cookies/accounts.
6. Bootstrap SkillSpector first when the user approves installation. Prefer a pinned release or commit from NVIDIA's official repository. Scan every other downloaded skill/plugin before enabling it. Use static analysis without an LLM first; do not imply that a clean scan proves safety.
7. Prefer official package-manager or repository instructions over `curl | sh`, copied social-media commands, or third-party installers. Pin versions when practical and show the exact source and command before execution.
8. Configure credentials through environment variables or the client's secret facility. Never write keys, cookies, tokens, or provider secrets into the repository, logs, skill files, or committed MCP configuration.
9. Validate each selected tool separately. Confirm its command starts, its client can discover it, and one harmless read-only operation works. Do not auto-approve mutating MCP tools.
10. Finish with the installed versions, clients configured, files changed, accounts or quotas still required, validation results, and exact uninstall/rollback instructions.

## Safety and compatibility rules

- Do not install all five by default. Several overlap, run local services, or require external accounts.
- "Open source" does not mean unlimited free operation. Distinguish license cost from provider usage, hosted quotas, and optional LLM analysis.
- Do not claim Kiro support merely because a project supports MCP in principle. Kiro supports MCP, but the individual project must expose a working MCP server and have a verified configuration.
- Treat Ponytail as the only one of these five with documented Claude Code, Codex, and Kiro adapters.
- For SkillSpector, use its CLI directly on any client. Its MCP extra can be configured in Kiro, but that is a portable adapter rather than documented SkillSpector-specific Kiro support.
- FreeLLM API is a local proxy, Claude-Mem is a memory service/plugin, Agent Reach is a research CLI, and SkillSpector is a security scanner. Installing them does not make them native features of every client.
- Stop and report if the official repository, expected license, package identity, checksum/signature, or install target is unclear.
- Make no commits, pushes, deployments, account registrations, or global installs unless the user explicitly requests them.
