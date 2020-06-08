defmodule Mix.Tasks.RaiseServer.Batch.Sample do
  @moduledoc """
  A sample Mix task running in a container on AWS Batch.
  """

  use Mix.Tasks.RaiseServer.Batch.Helper

  @impl true
  def perform(args) do
    Logger.info("Application is running with #{inspect args}")
  end
end
