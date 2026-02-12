import type { Command } from "@commander-js/extra-typings";
import { execSync } from "node:child_process";

export const registerCommand = (command: Command) =>
  void command
    .command("workspaces-list")
    .description(
      "List all workspace projects in the monorepo. Outputs JSON lines with 'location' and 'name' fields.",
    )
    .option(
      "--no-private",
      "Exclude projects that have the private field set to true",
    )
    .action(run);

function run({
  private: privateProjects,
}: {
  readonly private: boolean;
}): void {
  const json = execSync(
    "pnpm list --lockfile-only --recursive --depth -1 --json",
    { encoding: "utf-8" },
  );
  if (!json) {
    console.error("Failed to run `pnpm list`");
    return;
  }
  let projects = JSON.parse(json) as {
    name: string;
    path: string;
    private: boolean;
  }[];
  const { path: rootPath } = projects[0];
  projects = projects.slice(1);
  if (!privateProjects) {
    projects = projects.filter((project) => !project.private);
  }
  for (const project of projects) {
    console.log(
      `{"location":"${project.path.slice(rootPath.length + 1)}","name":"${project.name}"}`,
    );
  }
}
