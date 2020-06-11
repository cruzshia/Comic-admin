FROM ubuntu:trusty

ARG asdf_version="v0.7.8"

ARG ruby_version="2.3.1"
ARG bundler_version="1.17.3"

# use Bash because ASDF cannot be used with Ubuntu's default shell
SHELL ["/bin/bash", "-c"]

RUN apt-get update && apt-get install -y --no-install-recommends \
# tools used in the build process
  git \
  openssh-client \
# tools used when retrieving information
  curl \
  jq \
# required to install AWS CLI
  python-pip \
# dependencies for Ruby
# see https://github.com/rbenv/ruby-build/wiki#suggested-build-environment
  autoconf \
  bison \
  build-essential \
  libssl-dev \
  libyaml-dev \
  libreadline6-dev \
  zlib1g-dev \
  libncurses5-dev \
  libffi-dev \
  libgdbm3 \
  libgdbm-dev \
  libdb-dev \
# dependencies for Erlang
# see https://github.com/asdf-vm/asdf-erlang#ubuntu-and-debian
  libssh-dev \
# dependencies for Elixir (locales is required to set locale to UTF-8)
# see https://github.com/asdf-vm/asdf-elixir#install
  locales \
  unzip \
# dependencies for PreRenderer
  openjdk-7-jre \
  libasound2 \
  libnss3-1d \
  libgconf2-4 \
  libgcrypt11 \
  libgnome-keyring0 \
  libdbus-glib-1-2 \
  libudev1 \
  libcups2 \
  libgtk2.0-0 \
  libjpeg-turbo-progs \
# dependencies for EPUB_Converter (libxslt is required to install nokogiri)
  imagemagick \
  libmagickwand-dev \
  libxslt-dev \
# dependencies for Antikythera
  libexpat-dev \
  inotify-tools

# install AWS CLI
RUN pip install awscli

# generate locale for en_US.UTF-8
RUN echo 'en_US.UTF-8 UTF-8' > /etc/locale.gen \
 && locale-gen en_US.UTF-8 \
 && update-locale

# create a non-root user
ARG username="batch"
RUN useradd -m -u 501 -s /bin/bash $username

# switch to the non-root user
USER $username
ENV HOME /home/$username
WORKDIR $HOME

# Setting locale to en_US.UTF-8 is required for Elixir which is not installed in this Dockerfile,
# but we do it here to keep consistency throughout the build process.
ENV LANG en_US.UTF-8

# install ASDF
RUN git clone https://github.com/asdf-vm/asdf.git $HOME/.asdf -b $asdf_version

# install Ruby
RUN source $HOME/.asdf/asdf.sh \
 && asdf plugin-add ruby \
 && asdf install ruby $ruby_version \
 && asdf global ruby $ruby_version \
 && gem install bundler -v $bundler_version

# install PreRenderer
COPY --chown=$username:$username PreRenderer/ $HOME/libs/PreRenderer/
COPY --chown=$username:$username fonts/ $HOME/.nfbr_fonts/

# install EPUB_Converter
ENV EPUB_CONVERTER_ROOT $HOME/libs/EPUB_Converter
COPY --chown=$username:$username EPUB_Converter/ $EPUB_CONVERTER_ROOT/
COPY --chown=$username:$username ConvertToEpub.rb $HOME/libs/
RUN source $HOME/.asdf/asdf.sh \
 && cd $EPUB_CONVERTER_ROOT \
 && bundle install
