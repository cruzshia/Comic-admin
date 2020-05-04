use Croma

defmodule RaiseServer.RepoCase do
  use ExUnit.CaseTemplate

  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo
  alias RaiseServer.{App, AppScreenSetting}

  setup do
    RaiseServer.Ecto.prepare_repo()
    # TODO: Use Ecto.Adapters.SQL.Sandbox
    Repo.delete_all(AppScreenSetting)
    Repo.delete_all(App)
    :ok
  end

  using do
    quote do
      use RaiseServer.CommonCase

      defp mock_verify_app_api_token() do
        # TODO: Mock RaiseServer.Plug.VerifyAppApiToken
      end

      defp assert_error(res, expected_error) do
        assert res.status == expected_error.status
        res_body = Jason.decode!(res.body)
        assert res_body["type"]    == expected_error.type
        assert res_body["message"] == expected_error.message
      end
    end
  end
end
