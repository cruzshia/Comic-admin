#!/bin/bash

source $HOME/.asdf/asdf.sh

# TODO: fetch GearConfig securely (RA-4243)

mix raise_server.batch.sample $@
