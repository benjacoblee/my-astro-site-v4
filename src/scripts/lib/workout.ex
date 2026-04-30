defmodule WorkoutDetail do
  @derive Jason.Encoder

  defstruct workout_number: "",
            date: "",
            workout_name: "",
            exercise_name: "",
            set_order: "",
            detail: ""
end

alias WorkoutDetail

defimpl String.Chars, for: WorkoutDetail do
  def to_string(%WorkoutDetail{
        workout_number: workout_number,
        workout_name: workout_name,
        detail: detail
        # todo
      }) do
    """
    %Workout{
      #{workout_number}
      #{workout_name}
      #{detail}
    }
    """
  end
end

defmodule Workout do
  def get_last_workout(parsed_body) do
    workouts = parsed_body |> Enum.reverse()
    [[workout_number | _] | _] = workouts

    Enum.take_while(workouts, fn [curr_workout_number | _] ->
      curr_workout_number == workout_number
    end)
    |> Enum.reverse()
  end

  def format_set_string({reps, weight_in_kg}),
    do: "#{reps}x#{weight_in_kg}kg"

  def to_workout_detail([
        workout_number,
        date,
        workout_name,
        _,
        exercise_name,
        set_order,
        weight_in_kg,
        reps | _
      ]) do
    weight = if weight_in_kg == "", do: 0 / 1, else: weight_in_kg

    %WorkoutDetail{
      workout_number: workout_number,
      date: date |> String.split(" ") |> List.first(),
      workout_name: workout_name,
      exercise_name: exercise_name,
      set_order: set_order,
      detail: format_set_string({reps, weight})
    }
  end

  def to_workout_data(workout_list) do
    workouts =
      [
        %WorkoutDetail{
          date: date,
          workout_number: workout_number
        }
        | _
      ] = workout_list |> Enum.reject(&(&1.set_order == "Rest Timer" || &1.set_order == "Note"))

    %{date: date, workout_number: workout_number, workouts: workouts}
  end
end
