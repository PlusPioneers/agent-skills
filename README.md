# Zenith Agent Skills

Portable Agent Skills and a source-pinned website-rework catalog for Claude Code, Codex, and Kiro.

## Included skill

### `ai-coding-toolkit-setup`

Safely assesses, installs, configures, updates, and removes:

- FreeLLM API
- Ponytail
- Claude-Mem
- Agent Reach
- NVIDIA SkillSpector

The skill distinguishes native integrations from CLI and MCP adapters, checks prerequisites, protects credentials, and requires approval before external installations or configuration changes.

### `website-rework-toolkit`

Bootstraps the complete skill stack used for the Zenith website work. It provides design, content, architecture, SEO, security, browser testing, and UAT profiles while installing third-party skills from their original repositories at reviewed commits.

## Install

Install globally for Claude Code, Codex, and Kiro:

```bash
npx skills add PlusPioneers/agent-skills \
  --skill ai-coding-toolkit-setup \
  --agent claude-code \
  --agent codex \
  --agent kiro-cli \
  --global \
  --yes
```

Remove `--global` to install only in the current workspace.

Kiro can also import the skill-folder URL directly from **Agent Steering & Skills → Import a skill → GitHub**:

```text
https://github.com/PlusPioneers/agent-skills/tree/main/skills/ai-coding-toolkit-setup
```

Restart the agent session after installation so the skill is discovered.

## Install the catalog

Install the catalog skill globally:

```bash
npx skills add PlusPioneers/agent-skills@v1.1.1 \
  --skill website-rework-toolkit \
  --agent claude-code \
  --agent codex \
  --agent kiro-cli \
  --global \
  --yes
```

Then ask the agent to set up the `full`, `design`, `content`, or `quality` website-rework profile. The skill shows the pinned source plan and requests approval before running external installers.

The catalog references third-party projects at their original repositories instead of republishing them. See [`catalog.json`](skills/website-rework-toolkit/references/catalog.json) and [`THIRD_PARTY.md`](THIRD_PARTY.md).

## Use

Ask the agent to set up, compare, audit, update, or remove the five-tool AI coding toolkit. You can also invoke `ai-coding-toolkit-setup` explicitly from clients that expose skills as commands.

The skill does not install all five tools automatically. It first checks the environment and presents supported, security-conscious choices.

## Repository structure

```text
skills/
├── ai-coding-toolkit-setup/
│   ├── SKILL.md
│   ├── references/
│   │   └── tools.md
│   └── scripts/
│       └── detect-environment.mjs
└── website-rework-toolkit/
    ├── SKILL.md
    ├── references/
    │   └── catalog.json
    └── scripts/
        └── catalog.mjs
```

## Security

Agent skills execute with the permissions of the host agent. Review skills before installation and pin a release or commit when reproducibility matters. Never commit provider keys, tokens, cookies, or generated credentials.

## License

MIT
