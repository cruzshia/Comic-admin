use Croma

defmodule RaiseServer.Gettext do
  use Antikythera.Gettext, otp_app: :raise_server

  defun put_locale(locale :: v[String.t]) :: nil do
    Gettext.put_locale(__MODULE__, locale)
  end
end
