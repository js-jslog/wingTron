class GameStore {

  state = undefined

  setStateFromOptions(options) {
    this.state = optionsToGameState(options)
  }

  movePlayers() {
    let state = Object.assign({}, this.state)
    state.player_state.forEach((ps, index) => {
      this.state.player_state[index] = movePlayer(ps)
    })
  }
}

const movePlayer = (player_state) => {
  let ps = Object.assign({}, player_state)
  ps.path[0][0] += Math.cos(ps.direction);
  ps.path[0][1] += Math.sin(ps.direction);
  return ps
}

const optionsToGameState = (options) => {
  const options_keys = Object.keys(options)
  let state = {}
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
  var state = {}
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

const GameStoreInstance = new GameStore

export default GameStoreInstance

