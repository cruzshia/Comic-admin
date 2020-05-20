use Croma

defmodule RaiseServer.Account do
  use Ecto.Schema

  import Ecto.Query
  alias Ecto.Changeset
  alias RaiseServer.Account.{Device, User}
  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo

  @doc """
  create user and device, then associate together
  """
  defun create_user(device \\ %{}) :: User.t do
    User.changeset(%User{}, %{devices: [device]})
    |> Changeset.cast_assoc(:devices)
    |> Repo.insert!()
  end

  @doc """
  get device record by v2_device_id_token from database
  """
  defun get_device_by_v2_device_id_token(token :: v[String.t]) :: Device.t | nil do
    Device
    |> where(v2_device_id_token: ^token)
    |> Repo.one()
  end
end
