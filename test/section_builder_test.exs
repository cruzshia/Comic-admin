defmodule RaiseServer.SectionBuilderTest do
  use RaiseServer.RepoCase

  alias RaiseServer.{AppsFactory, DepotFactory, HomeData}
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

  describe "process_section/2" do
    setup do
      app = AppsFactory.insert(:app)
      [app: app]
    end

    test "process section when 'type' is 'subscription'", %{app: app} do
      %{setting: setting_str} = AppsFactory.insert(:home_screen, %{app_id: app.id})

      %{"subscription_id" => "sb" <> sub_id_str} = section = find_section(setting_str, "subscription")

      sub_id = sub_id_str |> String.to_integer
      sub = DepotFactory.insert(:subscription, %{id: sub_id})
      work = DepotFactory.insert(:magazine_work, %{subscription_id: sub.id, is_main_work_of_subscription: true})

      DepotFactory.insert(:work_app, %{work_id: work.id, app_id: app.id})
      %{id: content_id, thumbnail_image: image} = DepotFactory.insert(:magazine_content, %{
        work_id: work.id
      })

      response_image = image |> Map.delete(:__struct__) |> :jsx.encode |> :jsx.decode(return_maps: true)

      assert SectionBuilder.process_section(section, app.id, DateTime.utc_now(), nil) |> :jsx.encode ==
        section
        |> Map.put_new("latest_content", %{
          "id" => "mc#{content_id}",
          "image" => response_image
        })
        |> :jsx.encode
    end
  end

end
