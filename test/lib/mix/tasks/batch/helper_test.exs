defmodule Mix.Tasks.RaiseServer.Batch.HelperTest do
  use Croma.TestCase

  defp make_function_to_restore_env_var(name, value \\ nil) do
    original = System.get_env(name)
    unless is_nil(value) do
      System.put_env(name, value)
    end
    fn ->
      case original do
        nil -> System.delete_env(name)
        v -> System.put_env(name, v)
      end
    end
  end

  setup do
    aws_batch_job_id_restorer = make_function_to_restore_env_var("AWS_BATCH_JOB_ID", "dummy-job-id")
    aws_batch_job_attempt_restorer = make_function_to_restore_env_var("AWS_BATCH_JOB_ATTEMPT", "1")
    log_stream_id_restorer = make_function_to_restore_env_var("LOG_STREAM_ID", "job-definition-name/default/dummy-ecs-task-id")
    no_listen_restorer = make_function_to_restore_env_var("NO_LISTEN")
    original_console_config = Application.get_env(:logger, :console)
    on_exit(fn ->
      aws_batch_job_id_restorer.()
      aws_batch_job_attempt_restorer.()
      log_stream_id_restorer.()
      no_listen_restorer.()
      Logger.configure_backend(:console, original_console_config)
    end)
  end

  test "prepare_application/0 starts Gear Logger and Ecto Repo" do
    :ok = Helper.prepare_application()

    :ok = RaiseServer.Logger.info("Am I logging?")
    {:ok, _} = AntikytheraAcs.Ecto.PostgresRepo.query("SELECT * FROM pg_tables")
  end

  test "a module using Mix.Tasks.RaiseServer.Batch.Helper implements run/1" do
    defmodule SuccessTask do
      use Helper

      @impl true
      def perform([arg]) do
        assert arg == "1"
      end
    end

    assert SuccessTask.run(["1"]) == :ok
  end

  test "run/1 of a module using Mix.Tasks.RaiseServer.Batch.Helper " <>
        "calls on_failure/2 and then exits with status 1 if an error is raised" do
    defmodule FailureTask do
      use Helper

      @impl true
      def perform(_args), do: raise "Raise!"

      @impl true
      def on_failure(_args, %RuntimeError{message: message}) do
        assert message == "Raise!"
        IO.puts "I am called"
      end
    end

    assert ExUnit.CaptureIO.capture_io(fn ->
      assert FailureTask.run(["1"]) |> catch_exit() == {:shutdown, 1}
    end) == "I am called\n"
  end
end
