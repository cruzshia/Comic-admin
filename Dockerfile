# syntax=docker/dockerfile:experimental

ARG elixir_image

# `previous_image` can be either "elixir" or "gear" image.
ARG previous_image=$elixir_image

ARG mix_env

FROM $previous_image AS previous_container

# make a directory for the repository in case that `previous_image` is "elixir" image
RUN mkdir -p $HOME/Raise_Server/_build $HOME/Raise_Server/deps

FROM $elixir_image AS setup

# ensure user and working directory
ARG username="batch"
USER $username
RUN [ $UID -eq 501 ]
WORKDIR $HOME/Raise_Server/

# copy _build and deps directory to speed up the build process
COPY --from=previous_container --chown=$username:$username $HOME/Raise_Server/_build/ ./_build/
COPY --from=previous_container --chown=$username:$username $HOME/Raise_Server/deps/ ./deps/

# copy the repository from the host
COPY --chown=$username:$username ./ ./

# prepare to fetch private repositories
RUN mkdir -p -m 0700 $HOME/.ssh && ssh-keyscan github.com > $HOME/.ssh/known_hosts

# setup dependencies
RUN --mount=type=ssh,uid=501 \
    source $HOME/.asdf/asdf.sh \
# MIX_ENV=test is used for fetching dependencies for all Mix environments.
 && export MIX_ENV=test \
 && mix clean \
# First deps.get can fail when antikythera's mix.exs is modified.
 && (mix deps.get || mix deps.get) \
# Additional deps.get is necessary to fetch newly-added test-only deps.
 && mix deps.get

FROM setup AS dev

ENV MIX_ENV dev
RUN source $HOME/.asdf/asdf.sh \
 && mix compile

FROM setup AS prod

# run mix test
RUN --mount=type=secret,uid=501,id=test_secret,dst=/home/batch/Raise_Server/gear_test_config.json,required \
    source $HOME/.asdf/asdf.sh \
 && WHITEBOX_TEST_SECRET_JSON=$(< gear_test_config.json) mix test

ARG antikythera_compile_env
ARG antikythera_runtime_env

ENV MIX_ENV prod
ENV ANTIKYTHERA_MIX_TASK_MODE true
ENV ANTIKYTHERA_COMPILE_ENV $antikythera_compile_env
ENV ANTIKYTHERA_RUNTIME_ENV $antikythera_runtime_env
RUN source $HOME/.asdf/asdf.sh \
# ensure to recompile antikythera-related libraries with specified environment variables
 && mix clean \
 && mix deps.clean --build antikythera antikythera_acs \
 && mix compile

FROM $mix_env

RUN echo "Finished at $(date)"
