#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const catalogUrl = new URL("../references/catalog.json", import.meta.url);
const catalog = JSON.parse(await readFile(catalogUrl, "utf8"));
const args = process.argv.slice(2);
const command = args[0] ?? "list";

function option(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

function flag(name) {
  return args.includes(name);
}

const profileName = option("--profile", "full");
const profile = catalog.profiles[profileName];
if (!profile) {
  throw new Error(
    `Unknown profile '${profileName}'. Choose ${Object.keys(catalog.profiles).join(", ")}.`,
  );
}

const agents = option("--agents", "codex")
  .split(",")
  .map((agent) => agent.trim())
  .filter(Boolean);

const unsupportedAgents = agents.filter(
  (agent) => !catalog.supportedAgents.includes(agent),
);
if (unsupportedAgents.length) {
  throw new Error(`Unsupported agents: ${unsupportedAgents.join(", ")}`);
}

const skillsByName = new Map(catalog.skills.map((skill) => [skill.name, skill]));
const selectedSkills = profile.map((name) => {
  const skill = skillsByName.get(name);
  if (!skill) throw new Error(`Catalog entry missing for '${name}'.`);
  return skill;
});

function installArgs(skill) {
  const result = [
    "skills",
    "add",
    `${skill.source}@${skill.ref}`,
    "--skill",
    skill.selector,
  ];
  for (const agent of agents) result.push("--agent", agent);
  if (flag("--global")) result.push("--global");
  result.push("--yes");
  return result;
}

function displayCommand(skill) {
  return ["npx", ...installArgs(skill)].join(" ");
}

if (command === "list") {
  process.stdout.write(
    `${JSON.stringify(
      {
        profile: profileName,
        reviewedOn: catalog.reviewedOn,
        skills: selectedSkills.map(({ name, category, source, ref, license }) => ({
          name,
          category,
          source,
          ref,
          license,
        })),
      },
      null,
      2,
    )}\n`,
  );
  process.exit(0);
}

if (command === "plan") {
  for (const skill of selectedSkills) process.stdout.write(`${displayCommand(skill)}\n`);
  process.exit(0);
}

if (command !== "install") {
  throw new Error("Command must be list, plan, or install.");
}

if (!flag("--apply")) {
  throw new Error(
    "Installation is disabled without --apply. Run the plan command and review it first.",
  );
}

const executable = process.platform === "win32" ? "npx.cmd" : "npx";
for (const skill of selectedSkills) {
  process.stdout.write(`Installing ${skill.name} from ${skill.source}@${skill.ref}\n`);
  const result = spawnSync(executable, installArgs(skill), { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`Installation failed for ${skill.name} with exit code ${result.status}.`);
  }
}
