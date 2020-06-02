ARG base_image

FROM $base_image

ARG erlang_version="20.3.8.25"
ARG elixir_version="1.9.4"

# ensure user
ARG username="batch"
USER $username

# install Erlang
RUN source $HOME/.asdf/asdf.sh \
 && asdf plugin-add erlang \
 && asdf install erlang $erlang_version \
 && asdf global erlang $erlang_version

# install Elixir
RUN source $HOME/.asdf/asdf.sh \
 && asdf plugin-add elixir \
 && asdf install elixir $elixir_version \
 && asdf global elixir $elixir_version \
 && mix local.hex --force \
 && mix local.rebar --force
