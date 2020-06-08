use Croma

defmodule Mix.Tasks.RaiseServer.Batch.Helper do
  @moduledoc """
  This module provides functionalities for Mix task running in a container on AWS Batch.

  When this module is `use`d, a Mix task is defined with some functionalities required for AWS Batch.
  The first argument of the Mix task must be ID of DB record related to the Mix task.
  You need to implement `perform/1` which is a main part of the Mix task.
  You can optionally override `on_failure/2` which handles unexpected exceptions.

  Note that control flow structure and provided callbacks may change along with determination of specs.

  This module itself is not compiled to Mix task, but its name starts with `Mix.Tasks`
  to avoid violating some static analysys of antikytehra.
  """

  @callback perform(args :: [binary]) :: any
  @callback on_failure(args :: [binary], error :: any) :: any

  defmacro __using__(_) do
    quote do
      use Mix.Task

      alias RaiseServer.Logger
      alias Mix.Tasks.RaiseServer.Batch.Helper

      @behaviour Helper

      def run([_log_id_str | _] = args) do
        :ok = Helper.prepare_application()
        :ok = Helper.before_perform(args)
        perform(args)
      rescue
        error ->
          :ok = Logger.error(Exception.format(:error, error, __STACKTRACE__))
          on_failure(args, error)
          # We need to delay a shutdown to let Logger have time to finish writing logs.
          # Waiting time of 100 milliseconds is just ad-hoc.
          Process.sleep(100)
          exit {:shutdown, 1}
      else
        _ ->
          Logger.info("Job been completed successfully")
      end

      @impl true
      defun on_failure(args :: [binary], _error :: any) :: any do
        # TODO: need more meaningful implementation (RA-4244 or sometime when related specs are fixed)
        Logger.info("Cleaning up with #{inspect(args)}")
      end

      defoverridable [on_failure: 2]
    end
  end

  @doc false
  defun prepare_application() :: :ok do
    System.put_env("NO_LISTEN", "true")
    {:ok, _apps} = Application.ensure_all_started(:raise_server)
    :ok = configure_loggers()
    {:ok, _pid} = RaiseServer.Ecto.prepare_repo()
    :ok
  end

  @doc false
  defun before_perform([log_id_str | _] = _args :: v[[String.t]]) :: :ok do
    # TODO: need actual implementation working with DB (RA-4244 or sometime when related specs are fixed)
    log_id = String.to_integer(log_id_str)
    RaiseServer.Logger.info("Log Stream ID (#{log_stream_id()}) will be written to #{log_id}-th record")
  end

  defunp configure_loggers() :: :ok do
    job_id_with_attempt = "#{job_id()}-#{job_attempt()}"
    Logger.configure_backend(:console, [
      format: "$dateT$time+00:00 [$level$levelpad] job=#{job_id_with_attempt} $metadata$message\n",
      metadata: [:module],
    ])
    # intentionally set Job ID as Node ID
    Antikythera.Mix.Task.set_node_id_to_gear_log_context(job_id_with_attempt)
  end

  defunp job_attempt() :: pos_integer do
    System.fetch_env!("AWS_BATCH_JOB_ATTEMPT") |> String.to_integer()
  end

  defunp job_id() :: String.t do
    System.fetch_env!("AWS_BATCH_JOB_ID")
  end

  defunp log_stream_id() :: String.t do
    System.fetch_env!("LOG_STREAM_ID")
  end
end
