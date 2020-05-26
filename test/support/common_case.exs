use Croma

defmodule RaiseServer.CommonCase do
  use ExUnit.CaseTemplate

  setup do
    Antikythera.Test.GearLogHelper.set_context_id() # for error logging
    on_exit(&:meck.unload/0)
  end

  using do
    quote do
      @dummy_app_api_token "dummy_app_api_token"
      @dummy_aid           "dummy_token0"

      # todo: recursive
      defp schema_to_map(schema) do
        schema
        |> Map.from_struct()
        |> Map.delete(:__meta__)
      end
    end
  end
end
