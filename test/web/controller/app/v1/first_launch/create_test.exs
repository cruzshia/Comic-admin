defmodule RaiseServer.Controller.App.V1.FirstLaunch.CreateTest do
  use RaiseServer.RepoCase

  alias RaiseServer.{AccountFactory, AppFactory, Utils}

  @dummy_v2_device_id_token "dummy_v2_device_id_token"
  @path "/api/app/v1/first_launch"
  @header %{ "x-raise-aid" => @dummy_aid }
  @body %{ "v2_device_id_token" => @dummy_v2_device_id_token }

  setup do
    AppFactory.insert(:app)
    :ok
  end

  test "receives valid v2_device_id_token, returns api_token" do
    %{id: user_id} = AccountFactory.insert(:user)
    %{id: device_id} = AccountFactory.insert(:device, %{v2_device_id_token: @dummy_v2_device_id_token, user_id: user_id})

    assert %{status: 200, body: res_body} = Req.post_json(@path, @body, @header)

    %{"api_token" => token} = Jason.decode!(res_body)
    assert %{"type" => "api", "user_id" => ^user_id, "device_id" => ^device_id} = Utils.decrypt_api_token(token)
  end

  test "receives nothing, returns api_token from guest user" do
    assert %{status: 200, body: res_body} = Req.post_json(@path, %{}, @header)

    %{"api_token" => token} = Jason.decode!(res_body)
    assert %{"type" => "api", "user_id" => _, "device_id" => _} = Utils.decrypt_api_token(token)
  end

  test "receives invalid v2_device_id_token type, returns 400" do
    assert %{status: 400, body: res_body} = Req.post_json(@path, %{"v2_device_id_token" => 123}, @header)
  end

  test "receives none exist v2_device_id_token, returns 404" do
    assert %{status: 404, body: res_body} = Req.post_json(@path, @body, @header)
  end
end
