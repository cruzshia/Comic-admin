# Docker images used for AWS Batch

Some asynchronous processes are not suitable for Antikythera's AsyncJob.
We run such processes on AWS Batch.
This document describes Docker images directly/indirectly used for AWS Batch.
There are three images: `base`, `elixir` and `gear` image.
The `gear` image is based on the `elixir` image, and the `elixir` image is based on the `base` image.
AWS Batch will run containers created from the `gear` image.

## `base` image

This image contains all the things except for Erlang/Elixir and Raise_Server.
To use EPUB_Converter and PreRenderer, dependencies and versions of OS and languages are brought from [EPUB_CloudRender](https://github.com/access-company/EPUB_CloudRender).

- Dockerfile: `docker/base/Dockerfile`

### How to build on local

Ensure submodule `docker/base/EPUB_Converter` is actually downloaded.
You can set an arbitrary name instead of `raise-base-local`.

```shell
$ cd docker/base
$ docker build -t raise-base-local .
```

## `elixir` image

This image contains Erlang/Elixir environment upon the `base` image.
We separate Erlang/Elixir from the `base` image because Erlang/Elixir version is controlled by Antikythera and updated on a monthly basis.

- Dockerfile: `docker/base/Dockerfile`
- Build options:
    - `--build-arg base_image=<image>` (required): set the `base` image

### How to build on local

You can set an arbitrary name instead of `raise-elixir-local`.

```shell
$ cd docker/elixir
$ docker build \
  --build-arg base_image=raise-base-local \
  -t raise-elixir-local .
```

## `gear` image

This image contains Mix project of Raise_Server upon the `elixir` image.

- Dockerfile: `Dockerfile` (root of the repository)
- Build options:
    - `--build-arg elixir_image=<image>` (required): set the `elixir` image
    - `--build-arg previous_image=<image>` (optional): set the `gear` image from which `_build` and `deps` directory are copied to speed up the build; if not set, the Mix project will be built from scratch
    - `--build-arg mix_env=(dev|prod)` (required): set `MIX_ENV` used when the Mix project is compiled; if `prod`, `mix test` will be conducted before compile
    - `--build-arg antikythera_compile_env=<env>` (required when `mix_env=prod`): set [`ANTIKYTHERA_COMPILE_ENV`](https://hexdocs.pm/antikythera/Antikythera.Env.html)
    - `--build-arg antikythera_runtime_env=<env>` (required when `mix_env=prod`): set [`ANTIKYTHERA_RUNTIME_ENV`](https://hexdocs.pm/antikythera/Antikythera.Env.html)
    - `--ssh default` (required): use the host SSH agent to fetch private repositories
    - `--secret id=test_secret,src=<path/to/gear_test_config.json>` (required when `mix_env=prod`): pass whitebox test secrets as a build-time secret

### How to build on local

To use SSH forwarding and build-time secret functionality, we need to set `DOCKER_BUILDKIT=1`.
In addition, SSH agent with access rights to antikythera-related repositories is required to run on the host.
The below example builds `gear` image with `MIX_ENV=dev` from scratch.
You can set an arbitrary name instead of `raise-gear-local`.

```shell
$ DOCKER_BUILDKIT=1 docker build \
  --ssh default \
  --build-arg elixir_image=raise-elixir-local \
  --build-arg mix_env=dev \
  -t raise-gear-local .
```

The below example builds `gear` image with `MIX_ENV=prod` utilizing previously built `gear` image.
Since `mix test` runs, database connection is required.
In case of using database running on the host, you need to overwrite `"localhost"` with `"host.docker.internal"` in [`gear_test_config.json`](../gear/development_environment.md#create-gear_test_configjson).

```shell
$ DOCKER_BUILDKIT=1 docker build \
  --ssh default \
  --secret id=test_secret,src=./gear_test_config.json \
  --build-arg elixir_image=raise-elixir-local \
  --build-arg previous_image=raise-gear-local \
  --build-arg mix_env=prod \
  --build-arg antikythera_compile_env=dev \
  --build-arg antikythera_runtime_env=dev \
  -t raise-gear-local .
```

## Run a container on local

TBD: The way to run a container may change in RA-4243.

### Create gear_docker_config.json

```json
{
  "db": {
    "hostname": "host.docker.internal",
    "username": "postgres",
    "password": "****************",
    "database": "raise_server_dev",
    "ssl": false
  }
}
```

- `db`: For more details, please see [`gear_config.json`](../gear/development_environment.md#create-gear_configjson)

### Run `docker run`

```shell
$ docker run -it -e RAISE_SERVER_CONFIG_JSON="$(< gear_docker_config.json)" raise-gear-local ./script/docker/run_sample.sh arg1 arg2
2020-05-24T13:16:12.634+00:00 [info] context=20200524-131612.535_dummy-job-id-1_0.74.0 Application successfully started with ["arg1", "arg2"]
```
