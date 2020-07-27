(async () => {
    const core = require("@actions/core");
    const exec = require("@actions/exec");

    const command = core.getInput("command");
    await exec.exec(command, []);
})();
