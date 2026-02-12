#!/usr/bin/env node
import { Command } from "@commander-js/extra-typings";
import fs from "node:fs";

interface CommandModule {
  registerCommand: (program: Command) => void;
}

const program = new Command();

program.name("monorepo-cli").description("CLI for managing monorepo tasks");

const commandsDirectory = import.meta.dirname;

/**
 * If CLI is called with a specific command, only load that command.
 * Otherwise, load all.
 */
const commandName = process.argv[2];
const commandsToLoad =
  commandName !== undefined &&
  commandName !== "help" &&
  !commandName.startsWith("-")
    ? [`${commandName}.ts`]
    : fs.readdirSync(commandsDirectory);
// Load all commands in the ./commands directory
Promise.all(
  commandsToLoad.map(async (file) => {
    if (!file.endsWith(".ts")) {
      return;
    }
    let command: CommandModule;
    try {
      command = (await import(`./${file}`)) as CommandModule;
    } catch {
      console.error(`error: unknown command: ${file.slice(0, -".ts".length)}`);
      process.exit(1);
    }
    if (typeof command.registerCommand === "function") {
      command.registerCommand(program);
    }
  }),
)
  .then(() => program.parse())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
