export default function optionsToGameState(options) {
  const options_keys = Object.keys(options)
  const state = {}
  options_keys.forEach(key => {
    const option = options[key]
    state[key] = transformOption(key, option)
  })
  Object.defineProperty(state, 'player_state', 
    Object.getOwnPropertyDescriptor(state, 'player_options'))
  delete state.player_options
  return state
}

const transformOption = (key, option) => {
  switch (key) {
    case 'player_options':
      return playerOptionsArrayToPlayerStateArray(option)
      break
    default:
      return parseInt(option)
      break
  }
}

const playerOptionsArrayToPlayerStateArray = (player_options_array) => (
  player_options_array.map(playerOptionsToPlayerState)
)

const playerOptionsToPlayerState = (player_options) => {
  const player_options_keys = Object.keys(player_options)
  const state = {}
  player_options_keys.forEach(key => {
    const player_option = player_options[key]
    state[key] = transformPlayerOption(key, player_option)
  })
  state.path = [
    [ state.start_coord_x, state.start_coord_y ],
    [ state.start_coord_x, state.start_coord_y ],
  ]
  delete state.start_coord_x
  delete state.start_coord_y
  return state
}

const transformPlayerOption = (key, player_option) => {
  switch (key) {
    case 'start_coord_x':
      return parseInt(player_option)
      break
    case 'start_coord_y':
      return parseInt(player_option)
      break
    case 'direction':
      return parseFloat(player_option)
      break
    case 'colour':
      return player_option
      break
    default:
      return parseInt(player_option)
      break
  }
}
