# Post-Run GitHub action

A simple GitHub action that enables running post-run steps, once a workflow job has ended.

## Inputs

### `command`

**Required** A command that needs to be run. Default `echo "This is a post-run step..."`.

## Example usage
Latest version: `1.0.0`

```yaml
name: Build

on:
  push:
    branches: [ master ]

env:
  GH_TOKEN: ${{ secrets.GH_TOKEN }}

jobs:
  something:
    name: Do something...
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
    
      - uses: webiny/action-post-run@1.0.0
        id: post-run-command
        with:
          command: echo "this thing works!"

      - uses: webiny/action-post-run@1.0.0
        id: another-post-run-command
        with:
          command: echo "this thing works again!"

      - name: 'Running an non-existing command will fail...'
        run: run something that does not exist;
```

This above configuration will produce the following:

![image](./docs/action-results.png)

ℹ️ Note the order of execution. The `command: echo "this thing works again!"` was executed before the `command: echo "this thing works!"` command.
