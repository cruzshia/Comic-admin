defmodule RaiseServer.AccountFactory do

  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo
  alias RaiseServer.Account.{Device, User}

  def device_factory() do
    %Device{}
  end

  def user_factory() do
    %User{}
  end

  # TODO: Use ex_machina
  def insert(schema_name, attrs \\ %{}) do
    schema_function = "#{schema_name}_factory" |> String.to_existing_atom()

    apply(__MODULE__, schema_function, [])
    |> struct!(attrs)
    |> Repo.insert!()
  end
end
