use Croma

defmodule RaiseServer.Crypto do
  @key_length_byte 32
  @iv_length_byte 16
  @salt_length_byte 8

  defunp derive_key_and_iv(key :: v[binary], salt :: v[binary]) :: {binary, binary} do
    {d, _} = Enum.reduce_while(1..100, {"", ""}, fn (_, {d, di}) ->
      if byte_size(d) >= @key_length_byte + @iv_length_byte do
        {:halt, {d, di}}
      else
        di = :crypto.hash(:md5, di <> key <> salt)
        {:cont, {d <> di, di}}
      end
    end)
    <<key::binary-size(@key_length_byte), iv::binary-size(@iv_length_byte), _::binary>> = d
    {key, iv}
  end

  defun aes256_encrypt(clear_text :: v[String.t], key :: v[String.t]) :: binary do
    salt = :crypto.strong_rand_bytes(@salt_length_byte)
    {key, iv} = derive_key_and_iv(key, salt)
    encrypted = :crypto.block_encrypt(:aes_cbc256, key, iv, :jose_jwa_pkcs7.pad(clear_text))
    "Salted__" <> salt <> encrypted
  end

  defun aes256_decrypt(cipher_text :: v[binary], key :: v[String.t]) :: String.t do
    <<"Salted__", salt::binary-size(@salt_length_byte), encrypted::binary>> = cipher_text
    {key, iv} = derive_key_and_iv(key, salt)
    plaintext = :crypto.block_decrypt(:aes_cbc256, key, iv, encrypted)
    :jose_jwa_pkcs7.unpad(plaintext)
  end
end
