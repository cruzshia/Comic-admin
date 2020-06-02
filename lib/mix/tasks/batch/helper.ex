use Croma

defmodule Mix.Tasks.RaiseServer.Batch.Helper do
  @moduledoc """
  Provides functionalities for Mix task running in a container on AWS Batch.

  This module is not compiled to Mix task, but its name starts with `Mix.Tasks`
  to avoid violating some static analysys of antikytehra.
  """

  defun prepare_application() :: :ok do
    System.put_env("NO_LISTEN", "true")
    {:ok, _apps} = Application.ensure_all_started(:raise_server)
    task_id = [
      System.get_env("AWS_BATCH_JOB_ID", "dummy-job-id"),
      System.get_env("AWS_BATCH_JOB_ATTEMPT", "1"),
    ] |> Enum.join("-")
    Antikythera.Mix.Task.set_node_id_to_gear_log_context(task_id) # set Task ID as Node ID
    {:ok, _pid} = RaiseServer.Ecto.prepare_repo()
    :ok
  end
end
