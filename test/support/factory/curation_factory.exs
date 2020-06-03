defmodule RaiseServer.CurationFactory do
  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo

  alias RaiseServer.Curation
  alias Curation.{WorkTag, Tag}

  def tag_factory() do
    %Tag{
      name: "overall",
    }
  end

  def work_tag_factory() do
    %WorkTag{
      tag_group: "ranking",
      sort_code: 0
    }
  end

  def insert(schema_name, attrs \\ %{}) do
    schema_function = "#{schema_name}_factory" |> String.to_existing_atom

    apply(__MODULE__, schema_function, [])
    |> struct!(attrs)
    |> Repo.insert!
  end
end
