// Based on https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsshell
function formatShellCommand (shell: string, path: string): [string, string[]] {
    switch (shell) {
        case "bash":
            return [shell, ["--noprofile", "--norc", "-eo", "pipefail", path]];
        case "powershell":
            return [shell, ["-command", `". '${path}'"`]];
        case "pwsh":
            return [shell, ["-command", `". '${path}'"`]];
        case "python":
            return [shell, [path]];
        case "sh":
            return [shell, ["-e", path]];
        default:
            return [shell.replace('{0}', path), []];
    }
}

(async () => {
    const fs = require("fs").promises;
    const path = require("path");
    const core = require("@actions/core");
    const exec = require("@actions/exec");
    const io = require("@actions/io");
    const uuid = require("uuid");

    const run = core.getInput("run");
    const shell = core.getInput("shell");
    const cwd = core.getInput("working-directory");

    if (shell) {
        const tempDir = process.env["RUNNER_TEMP"] || "/tmp";

        // UUIDv4 is used based on @actions/cache.
        let scriptPath = path.join(tempDir, `post-run-${uuid.v4()}`);
        if (shell === "pwsh" || shell === "powershell") {
            scriptPath += ".ps1";
        }

        await fs.writeFile(scriptPath, run);
        await exec.exec(...formatShellCommand(shell, scriptPath), { cwd });
    } else {
        await exec.exec(run, [], { cwd });
    }
})();
