import CollisionDetection from './collisionDetection.js';
import { EventEmitter } from 'events'

class GameStore extends EventEmitter {

  NOT_STARTED = 'NOT_STARTED'
  RUNNING = 'RUNNING'
  ENDED = 'ENDED'

  DEFAULT_STATE = {
    status: this.NOT_STARTED
  }

  state = undefined

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
    if (JSON.stringify(this.state.collision_matrix) !== JSON.stringify(collision_matrix)) {
      this.emit('collision_matrix_update')
      this.state.collision_matrix = collision_matrix
    }
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

const GameStoreInstance = new GameStore

export default GameStoreInstance

