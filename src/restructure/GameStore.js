import CollisionDetection from './collisionDetection.js';

class GameStore {

  NOT_STARTED = 'NOT_STARTED'
  RUNNING = 'RUNNING'
  ENDED = 'ENDED'

  DEFAULT_STATE = {
    status: this.NOT_STARTED
  }

  state = undefined

  setStateFromOptions(options) {
    this.state = optionsToGameState(options)
  }

  movePlayers() {
    const state = JSON.parse(JSON.stringify(this.state))
    state.player_state.forEach((ps, index) => {
      state.player_state[index] = movePlayer(ps)
    })
    this.state = state
  }

  handleKeyPress(keycode) {
    const state = JSON.parse(JSON.stringify(this.state))
    state.player_state.forEach((ps, index) => {
      if (ps.turn_left_keycode === keycode) {
        addPathNode(state.player_state[index].path)
        state.player_state[index].direction -= (Math.PI * 0.5)
      }
      if (ps.turn_right_keycode === keycode) {
        addPathNode(state.player_state[index].path)
        state.player_state[index].direction += (Math.PI * 0.5)
      }
    })
    this.state = state
  }

  calculateCollisionMatrix() {
    const player_paths = getPathsFromGameState(this.state)
    const collision_matrix = player_paths.map(subject_path => (
      player_paths.map(object_path => (
        intersects(subject_path, object_path)
      ))
    ))
    this.state.collision_matrix = collision_matrix
  }
}

const getPathsFromGameState = (state) => {
  return state.player_state.map(ps => ps.path)
}

const intersects = (path1, path2) => {
  return CollisionDetection.isPointWithinPath(path1[0], path2)
}

const addPathNode = (path) => {
  path.unshift([].slice.call(path[0], 0))
}

const movePlayer = (player_state) => {
  const ps = Object.assign({}, player_state)
  ps.path[0][0] += Math.cos(ps.direction);
  ps.path[0][1] += Math.sin(ps.direction);
  return ps
}

const optionsToGameState = (options) => {
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

const GameStoreInstance = new GameStore

export default GameStoreInstance

