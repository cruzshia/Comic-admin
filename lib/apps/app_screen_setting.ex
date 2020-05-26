use Croma

defmodule RaiseServer.Apps.AppScreenSetting do
  use Ecto.Schema

  import Ecto.Changeset
  alias Ecto.{Changeset, Schema}

  alias RaiseServer.Apps

  @type t :: %__MODULE__{}

  @timestamps_opts [type: :utc_datetime]

  schema "app_screen_settings" do
    belongs_to :app, Apps.App

    field :screen,           RaiseServer.ScreenEnum
    field :publish_begin_at, :utc_datetime
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
        :setting,
        :note,
      ]
    )
    # TODO: validate_format()
    |> validate_required([
      :app_id,
      :screen,
      :publish_begin_at,
      :setting,
      :note,
    ])
    |> validate_setting_json()
    |> foreign_key_constraint(:app_id)
    |> unique_constraint(:app_id, name: :app_screen_settings_app_id_screen_publish_period_index)
  end

  defp validate_setting_json(changeset) do
    str = get_change(changeset, :setting) || ""
    case {str, :jsx.is_json(str)} do
      {"", _}  -> changeset
      {_, true} -> changeset
      _         -> add_error(changeset, :setting, "not valid commented json")
    end
  end
end
