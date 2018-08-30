export function reducePlayerStates(player_state, state_item_name) {
  return JSON.parse(JSON.stringify(
    player_state.map(player_state => player_state[state_item_name])
  ))
}
