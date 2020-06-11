use Croma

defmodule RaiseServer.Utils do

  alias RaiseServer.Crypto
  alias RaiseServer.Account.Device

  defun create_api_token(%{id: device_id, user_id: user_id} :: Device.t, now :: DateTime.t) :: String.t do
    api_token_key = RaiseServer.get_env("api_token_key")
    Jason.encode!(%{type: "api", device_id: device_id, user_id: user_id, created_at: now})
    |> Crypto.aes256_encrypt(api_token_key)
    |> Base.url_encode64(padding: false)
  end

  defun decrypt_api_token(token :: String.t) :: map do
    api_token_key = RaiseServer.get_env("api_token_key")
    Base.url_decode64!(token, padding: false)
    |> Crypto.aes256_decrypt(api_token_key)
    |> Jason.decode!()
  end
end
