use Croma

defmodule RaiseServer.AppScreenSetting do
  use Ecto.Schema

  import Ecto.{Query, Changeset}
  alias Ecto.{Changeset, Schema}
  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo

  # TODO: Use ecto_enum and remove this
  defmodule Screen do
    use Croma.SubtypeOfAtom, values: [:home, :comics_store, :free_periodical, :free_only_now]
    @map_to_integer %{
      home:            0,
      comics_store:    1,
      free_periodical: 2,
      free_only_now:   3,
    }
    def to_integer(a), do: @map_to_integer[a]
  end

  @type t :: %__MODULE__{}

  @primary_key     {:id, :integer, []}
  @timestamps_opts [type: :utc_datetime]

  schema "app_screen_settings" do
    belongs_to :app, RaiseServer.App
    field :screen,           :integer # TODO: Use the defined type by ecto_enum.
    field :publish_begin_at, :utc_datetime
    field :publish_end_at,   :utc_datetime
    field :setting,          :string
    field :note,             :string

    timestamps()
  end

  defun changeset(app_screen_setting :: Schema.t, attrs :: v[map]) :: Changeset.t do
    app_screen_setting
    |> cast(
      attrs,
      [
        :id,
        :app_id,
        :screen,
        :publish_begin_at,
        :publish_end_at,
        :setting,
        :note,
      ]
    )
    # TODO: validate_format()
    |> validate_required([
      :app_id,
      :screen,
      :publish_begin_at,
      :publish_end_at,
      :setting,
      :note,
    ])
    |> foreign_key_constraint(:app_id)
    |> unique_constraint(:app_id, name: :app_screen_settings_app_id_screen_publish_period_index)
  end

  defun get_by_screen(screen :: v[Screen.t], app_id :: v[integer], now :: DateTime.t) :: t | nil do
    screen_int = Screen.to_integer(screen)  # TODO: Use ecto_enum and remove this
    __MODULE__
    |> where(app_id: ^app_id)
    |> where(screen: ^screen_int)
    |> where([s], s.publish_begin_at <= ^now and s.publish_end_at >= ^now)
    |> first([desc: :publish_begin_at])
    |> Repo.one()
  end

  defp translate_sections(:home, sections, _now) do
    # TODO: Translate sections
    sections
  end
  defp translate_sections(:comics_store, sections, _now) do
    # TODO: Translate sections
    sections
  end
  defp translate_sections(:free_periodical, sections, _now) do
    # TODO: Translate sections
    sections
  end
  defp translate_sections(:free_only_now, sections, _now) do
    # TODO: Translate sections
    sections
  end

  defun get_and_build_sections(screen :: v[Screen.t], app_id :: v[integer], now :: DateTime.t) :: v[list(map) | nil] do
    case get_by_screen(screen, app_id, now) do
      nil ->
        nil
      app_screen_setting ->
        %{"sections" => sections} = decode_setting(app_screen_setting)
        translate_sections(screen, sections, now)
    end
  end

  defunp decode_setting(app_screen_setting :: t) :: v[map] do
    # TODO: Use jsx to support comment in json
    Poison.decode!(app_screen_setting.setting)
  end
end
