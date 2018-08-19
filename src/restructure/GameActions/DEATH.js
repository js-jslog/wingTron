export default function (collision_matrix) {
  const death_array = collision_matrix.map(player_collision_array => {
    return player_collision_array.some(a => a)
  })

  return death_array
}
