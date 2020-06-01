use Croma

defmodule RaiseServer.Account do
  use Ecto.Schema

  alias Ecto.Changeset
  alias RaiseServer.Account.{Device, User}
  alias RaiseServer.EctoQueryMaker
  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo

  @doc """
  create user and device, then associate together
  """
  defun create_user(device :: v[map] \\ %{}) :: User.t do
    User.changeset(%User{}, %{devices: [device]})
    |> Changeset.cast_assoc(:devices)
    |> Repo.insert!()
  end

  @doc """
  get device record by conditions from database
  """
  defun get_device(filters :: v[list], opts :: v[list] \\ []) :: Device.t | nil do
    Device
    |> EctoQueryMaker.apply(filters, opts)
    |> Repo.one()
  end
end
