class GameStore {

  state = {}

  setStateFromOptions(options) {
    this.state = optionsToGameState(options)
  }
}

const optionsToGameState = (options) => {
  const options_keys = Object.keys(options)
  let state = {}
  options_keys.forEach(key => {
    const option = options[key]
    state[key] = transformOption(key, option)
  })
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
  let state = {}
  player_options_keys.forEach(key => {
    const player_option = player_options[key]
    state[key] = transformPlayerOption(key, player_option)
  })
  return state
}

const transformPlayerOption = (key, player_option) => {
  switch (key) {
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

const GameStoreInstance = new GameStore

export default GameStoreInstance

