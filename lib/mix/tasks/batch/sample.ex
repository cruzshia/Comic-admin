use Croma

defmodule Mix.Tasks.RaiseServer.Batch.Sample do
  @moduledoc """
  A sample Mix task running in a container on AWS Batch.
  """

  use Mix.Task

  alias RaiseServer.Logger
  alias Mix.Tasks.RaiseServer.Batch.Helper

  def run(args) do
    :ok = Helper.prepare_application()
    Logger.info("Application successfully started with #{inspect args}")
  end
end
