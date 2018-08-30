export default function (collision_matrix, current_death_status_array) {
  const instance_death_array = collision_matrix.map(player_collision_array => {
    return player_collision_array.some(a => a)
  })
  const outcome_death_array = instance_death_array.map((instance_death_status, index) => {
    return !!(instance_death_status || current_death_status_array[index])
  })

  return outcome_death_array
}
