# Gear Development Environment

## Install required software

### Gear common requirement

See Antikythera [Development Environment](https://hexdocs.pm/antikythera/development_environment.html).

### Install PostgreSQL

#### Case of Homebrew

```bash
$ brew install postgresql@11
$ brew services start postgresql@11
$ createuser -d postgres
```

#### Case of Docker

Create container.
```bash
$ docker run --name <docker_container_name> -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=<password> -d postgres:11
```

Run container.
```bash
$ docker start <docker_container_name>
```

Stop container.
```bash
$ docker stop <docker_container_name>
```

## Run on local

### Create gear_config.json

```json
{
  "db": {
    "hostname": "localhost",
    "username": "postgres",
    "password": "****************",
    "database": "raise_server_dev",
    "ssl": false
  },
  "api_token_key": "****************",
  "cdn_host": "https://**************.com/"
}
```

- `db`: The connection setting of DB(PostgreSQL).
  - `hostname`: The hostname. Use `localhost` to connect PostgreSQL on local environment.
  - `username`: The user name of PostgreSQL. The user needs to have the privilege to create/drop DB.
  - `password`: The password of the PostgreSQL user.
  - `database`: The name of the database. Use `raise_server_dev` on local environment.
  - `ssl`: Whether to use SSL/TLS for connection. Use `false` when in the case of the local environment. Use `true` in case of connecting AWS Aurora with SSL/TLS.
- `api_token_key`: The AES256 key for api token.
- `cdn_host`: The CDN host name.

### Create gear_test_config.json

It is used by `mix test`.

```json
{
  "db": {
    "hostname": "localhost",
    "username": "postgres",
    "password": "****************",
    "database": "raise_server_test",
    "ssl": false
  }
}
```

- `db`: The connection setting of DB(PostgreSQL).
  - `hostname`: Same with `gear_config.json`.
  - `username`: Same with `gear_config.json`.
  - `password`: Same with`gear_config.json`.
  - `database`: Use `raise_server_test` on local test environment.
  - `ssl`: Same with `gear_config.json`.

### Create/Migrate DB

Create DB.
```bash
$ RAISE_SERVER_CONFIG_JSON=$(< gear_config.json) mix raise_server.ecto.create
```

Run migration.
```bash
$ RAISE_SERVER_CONFIG_JSON=$(< gear_config.json) mix raise_server.ecto.migrate
```

### Run gear

```bash
$ RAISE_SERVER_CONFIG_JSON=$(< gear_config.json) iex -S mix
```

### Lint

```bash
$ mix dialyzer
$ mix credo --strict -a
```

### Unit testing

It is necessary to set `WHITEBOX_TEST_SECRET_JSON` to connect PostgreSQL on unit testing.

```bash
$ WHITEBOX_TEST_SECRET_JSON=$(< gear_test_config.json) mix test
```
