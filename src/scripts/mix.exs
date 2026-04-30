defmodule SiteScripts.MixProject do
  use Mix.Project

  def project do
    [
      app: :site_x_scripts,
      version: "0.1.0",
      elixir: "~> 1.18",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      escript: [main_module: MyScript]
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"}
      {:bandit, "~> 1.0"},
      {:req, "~> 0.5"},
      {:nimble_csv, "~> 1.1"},
      {:vaux, "~> 0.3"}
    ]
  end
end
