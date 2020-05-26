use Croma

defmodule RaiseServer.Utils do

  alias RaiseServer.Crypto

  defun decrypt_api_token(token :: String.t) :: String.t do
    api_token_key = RaiseServer.get_env("api_token_key")
    Base.url_decode64!(token, padding: false)
    |> Crypto.aes256_decrypt(api_token_key)
    |> Jason.decode!()
  end
end
