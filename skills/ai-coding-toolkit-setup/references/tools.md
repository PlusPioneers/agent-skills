# Tool reference

Verified against official project documentation on 2026-11-15. Re-check the linked README before installation because commands and support can change.

| Tool | Form | Claude Code | Codex | Kiro | Cost reality | Setup difficulty |
| --- | --- | --- | --- | --- | --- | --- |
| [FreeLLM API](https://github.com/tashfeenahmed/freellmapi) | Local OpenAI/Anthropic-compatible proxy | Documented | Documented | No documented adapter | MIT and self-hosted; upstream provider accounts, quotas, or charges may still apply | Moderate |
| [Ponytail](https://github.com/DietrichGebert/ponytail) | Agent skill/plugin for coordinated subagents | Documented plugin | Documented plugin | Documented instruction adapter | MIT; core project is free | Easy |
| [Claude-Mem](https://github.com/thedotmack/claude-mem) | Memory plugin, CLI, hooks, local worker, and MCP | Documented | Documented | Not documented | Apache-2.0 core; optional model/provider use can consume trials, subscriptions, or API quota | Moderate |
| [Agent Reach](https://github.com/Panniantong/Agent-Reach) | Research and social-platform CLI | Documented | Documented | Not documented | MIT core; some capabilities require accounts, cookies, external utilities, or model/API access | Moderate |
| [NVIDIA SkillSpector](https://github.com/NVIDIA/skillspector) | Skill security-scanning CLI with optional MCP server | Documented scan target/integration | Documented scan target/integration | Generic CLI works; Kiro-specific integration is not documented | Apache-2.0 static scanner is free; optional LLM analysis can require a provider or authenticated CLI | Easy to moderate |

## Supported installation shapes

Use the current commands from each official README rather than copying this file blindly.

### FreeLLM API

- Requires Node.js and configuration for one or more upstream providers.
- Official setup includes a Claude-oriented configuration command and an install script. Prefer a package-manager install or reviewed, pinned source over piping a remote shell script directly.
- Its compatible HTTP APIs can sometimes be consumed by other clients, but that is client configuration, not native support.

### Ponytail

- Claude Code and Codex have documented marketplace/plugin commands.
- Kiro has a documented instruction-only adapter.
- Some richer UI behavior is client-specific; portable instructions do not guarantee identical presentation across clients.

### Claude-Mem

- The official `npx claude-mem install` flow has client/setup options.
- Expect a local worker, hooks, and storage. Explain data retention and provider choices before enabling it.
- Do not invent a Kiro adapter. A future MCP route is acceptable only after confirming an official server command and testing it in Kiro.

### Agent Reach

- The official README points to its repository install guide.
- Review that guide before running agent-generated install prompts. Enable only the platforms the user needs.
- Never extract or store browser cookies without explicit approval.

### NVIDIA SkillSpector

- Official installation uses `uv tool install` from NVIDIA's GitHub repository; the `[mcp]` extra adds the MCP server.
- Begin with static analysis and no LLM. Note whether OSV network lookups are enabled.
- Scan a downloaded source directory before enabling hooks or client plugins. Scan results reduce risk; they are not a guarantee.

## Client interpretation

- **Claude** means Claude Code for these development integrations, not the general Claude web app.
- **GPT** should normally be interpreted as Codex CLI/IDE for project tooling. ChatGPT supports skills and MCP-backed plugins through a different distribution model.
- **Kiro** supports local and remote MCP servers through `.kiro/settings/mcp.json`, but a CLI-only project does not automatically become an MCP server.
