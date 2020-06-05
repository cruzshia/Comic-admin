use Croma

defmodule RaiseServer.Controller.Console.V1.Ip do
  alias Antikythera.IpAddress.V4
  alias AntikytheraAcs.IpAddress.Access, as: AcsIpAddress

  @acs_ip_ranges if Antikythera.Env.compile_env() == :prod, do: [], else: AcsIpAddress.ranges_all()
  cidrs = [
    "1.55.242.188/32",
    "116.97.243.74/32",
    "113.164.228.14/32",
    "42.116.7.14/32",
    "14.176.232.181/32",
    "118.69.176.252/32",
    "42.116.19.204/32",
    "60.251.179.141/32",
    "54.238.51.176/32",
  ]
  @ranges Enum.map(cidrs, &V4.parse_range!/1) ++ @acs_ip_ranges
  defun ip_ranges() :: [V4.range], do: @ranges
end
