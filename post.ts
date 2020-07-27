(async () => {
    const core = require("@actions/core");
    const exec = require("@actions/exec");

    const commands = core.getInput('commands');
    for (let i = 0; i < commands.length; i++) {
        let command = commands[i];
        await exec.exec(command, []);
    }
})();
