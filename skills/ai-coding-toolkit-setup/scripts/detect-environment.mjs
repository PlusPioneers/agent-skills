#!/usr/bin/env node

import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const isWindows = process.platform === "win32";
const lookup = isWindows ? "where.exe" : "which";
const commands = ["node", "npm", "npx", "uv", "uvx", "claude", "codex", "kiro"];

function findCommand(command) {
  try {
    const output = execFileSync(lookup, [command], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

const cwd = process.cwd();
const projectPaths = [
  ".agents/skills",
  ".claude/skills",
  ".kiro/skills",
  ".kiro/settings/mcp.json",
  ".codex/skills",
].map((relativePath) => ({
  path: relativePath,
  exists: existsSync(resolve(cwd, relativePath)),
}));

const result = {
  readOnly: true,
  checkedAt: new Date().toISOString(),
  platform: process.platform,
  architecture: process.arch,
  node: process.version,
  workingDirectory: cwd,
  commands: Object.fromEntries(
    commands.map((command) => [command, findCommand(command)]),
  ),
  projectPaths,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
