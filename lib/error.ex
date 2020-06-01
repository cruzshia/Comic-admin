use Croma

defmodule RaiseServer.Error do
  defmodule ErrorBase do
    defmacro __using__(default) do
      quote do
        use Croma.Struct, recursive_new?: true, fields: [
          type:    Croma.String,
          status:  Croma.Integer,
          message: Croma.String,
        ]

        defun new() :: t do
          new!(unquote(default))
        end

        def new(v) do
          with_default = unquote(default) |> Map.merge(v)
          super(with_default)
        end
      end
    end
  end

  defmodule BadRequest do
    use ErrorBase, %{
      type:    "BadRequest",
      status:  400,
      message: "",
    }
  end

  defmodule ResourceNotFound do
    use ErrorBase, %{
      type:    "ResourceNotFound",
      status:  404,
      message: "",
    }
  end

  defmodule ObsoleteAPIToken do
    use ErrorBase, %{
      type:    "ObsoleteAPIToken",
      status:  401,
      message: "",
    }
  end
end
