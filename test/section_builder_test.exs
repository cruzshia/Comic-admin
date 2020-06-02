defmodule RaiseServer.SectionBuilderTest do
  use RaiseServer.RepoCase

  alias RaiseServer.{AppsFactory, HomeData}
  alias RaiseServer.SectionBuilder

  describe "generate/2" do
    setup do
      app = AppsFactory.insert(:app)
      [app: app]
    end

    test "generate sections from :home parameter", %{app: app} do
      now = DateTime.utc_now()
      HomeData.create_resources(app)

      SectionBuilder.generate(app.id, now, :home)
      # TODO complete this test when all sections are ready
    end
  end
end
