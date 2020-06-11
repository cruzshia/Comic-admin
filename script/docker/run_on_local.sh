#!/bin/bash

source $HOME/.asdf/asdf.sh

export AWS_BATCH_JOB_ID=dummy-job-id
export AWS_BATCH_JOB_ATTEMPT=1
export LOG_STREAM_ID=job-definition-name/default/dummy-ecs-task-id
# In addition, RAISE_SERVER_CONFIG_JSON should be set by `--env` option of `docker run`

mix_task_name=$1
mix $mix_task_name "${@:2}"
