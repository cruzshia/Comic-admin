use Croma

defmodule RaiseServer.RepoCase do
  use ExUnit.CaseTemplate

  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo
  alias RaiseServer.{Apps, Depot, Account}

  setup do
    RaiseServer.Ecto.prepare_repo()
    # TODO: Use Ecto.Adapters.SQL.Sandbox
    Repo.delete_all(Depot.ContentApp)
    Repo.delete_all(Depot.WorkApp)
    Repo.delete_all(Depot.WorkCampaignApp)
    Repo.delete_all(Depot.WorkCampaign)
    Repo.delete_all(Depot.WorkAuthor)
    Repo.delete_all(Depot.Author)
    Repo.delete_all(Depot.Campaign)
    Repo.delete_all(Depot.Content)
    Repo.delete_all(Depot.Work)
    Repo.delete_all(Depot.Subscription)
    Repo.delete_all(Apps.AppScreenSetting)
    Repo.delete_all(Apps.App)
    Repo.delete_all(Account.Device)
    Repo.delete_all(Account.User)
    :ok
  end

  using do
    quote do
      use RaiseServer.CommonCase
      import RaiseServer.ScreenSettingUtils

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
