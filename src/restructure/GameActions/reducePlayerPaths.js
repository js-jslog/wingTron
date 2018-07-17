export default function reducePlayerPaths(game_state) {
  const reduced_state = game_state.player_state.map(player_state => {
    const reduced_obj = {
      path: player_state.path,
      direction: player_state.direction,
    }
    return reduced_obj
  })
  return reduced_state
}

export function reducePlayerStates(player_state, state_item_name) {
  return player_state.map(player_state => player_state[state_item_name])
}
