(async () => {
    const core = require("@actions/core");
    const exec = require("@actions/exec");

    const command = core.getInput("command");
    const cwd = core.getInput("cwd");

    await exec.exec(command, [], { cwd });
})();
