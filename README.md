# serverboard-ws

WebSockets server for [serverboard-web](https://github.com/mat-sz/serverboard-web).

More details about the project are available in the [serverboard-web](https://github.com/mat-sz/serverboard-web) repository.

## Installation

Run `yarn install`, `yarn build` and then simply run `yarn start`. For development you can also run serverboard-ws with live reload, `yarn dev`.

## Configuration

`dotenv-flow` is used to manage the configuration.

The following variables are used for the configuration:

| Variable          | Default value | Description                                                                       |
| ----------------- | ------------- | --------------------------------------------------------------------------------- |
| `WS_HOST`         | `127.0.0.1`   | IP address to bind to.                                                            |
| `WS_PORT`         | `5000`        | Port to bind to.                                                                  |
| `WS_BEHIND_PROXY` | `no`          | Set to `yes` if you want the application to respect the `X-Forwarded-For` header. |
