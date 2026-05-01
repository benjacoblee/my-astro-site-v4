defmodule MyScript do
  Application.ensure_all_started(:req)

  def main(_args) do
    update_workout_html()
    copy_microposts()
    if was_content_updated?(), do: git_push()
  end

  def get_rendered_html_for_workout do
    # DataFetcher.fetch_data()
    data =
      File.read!("/mnt/d/data/self-hosted/orchestrator/dufs-data/strong.csv")
      |> CsvParser.parse()
      |> Workout.get_last_workout()
      |> Enum.map(&Workout.to_workout_detail/1)
      |> Workout.to_workout_data()
      |> Jason.encode!()
      |> Jason.decode!()

    html = Vaux.render!(Component, data)
    IO.puts(html)
    html
  end

  def update_workout_html() do
    template = File.read!("/mnt/d/data/code/site-x/src/scripts/template.txt")
    new_html = template |> String.replace("{{target}}", get_rendered_html_for_workout())
    IO.puts("Writing html for workout...")
    File.write!("/mnt/d/data/code/site-x/src/pages/last-workout.astro", new_html)
  end

  def copy_microposts() do
    in_path = "/mnt/d/data/obsdn/Microposts"
    out_path = "/mnt/d/data/code/site-x/src/data/microposts"
    IO.puts("Copying microposts from #{in_path} to #{out_path}...")
    File.cp_r!(in_path, out_path)
  end

  def was_content_updated?() do
    {contents, _} =
      System.cmd("git", ["status", "/mnt/d/data/code/site-x", "--porcelain"])

    lines = contents |> String.split("\n") |> Enum.reject(&(&1 == ""))

    Enum.any?(lines, fn line ->
      Enum.any?(["last-workout", "data/microposts"], &String.contains?(line, &1))
    end)
  end

  def git_push do
    IO.puts("Pushing to github...")
    System.cmd("git", ["add", "/mnt/d/data/code/site-x"])
    System.cmd("git", ["commit", "-m", "auto commit via hook"])
    System.cmd("git", ["push"])
  end
end
