(async () => {
    const core = require("@actions/core");
    const exec = require("@actions/exec");

    const run = core.getInput("run");
    const cwd = core.getInput("working-directory");

    await exec.exec(run, [], { cwd });
})();
