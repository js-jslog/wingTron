export function reducePlayerStates(player_state, state_item_name) {
  return player_state.map(player_state => player_state[state_item_name])
}
