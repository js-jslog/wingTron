import CollisionDetection from './collisionDetection.js'
import { EventEmitter } from 'events'
import dispatcher from '../lib/dispatcher.js'

class GameStore extends EventEmitter {

  NOT_STARTED = 'NOT_STARTED'
  RUNNING = 'RUNNING'
  ENDED = 'ENDED'

  DEFAULT_STATE = {
    status: this.NOT_STARTED
  }

  state = undefined

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

  startNewGame(state) {
    this.state = state
  }

  updatePlayerPaths(paths) {
    paths.forEach((path, index) => this.state.player_state[index].path = path)
  }

  handleActions(action) {
    switch(action.type) {
      case 'START_NEW_GAME':
        this.startNewGame(action.state)
        break
      case 'UPDATE_PLAYER_PATHS':
        this.updatePlayerPaths(action.paths)
        break
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

const GameStoreInstance = new GameStore
dispatcher.register(GameStoreInstance.handleActions.bind(GameStoreInstance))

export default GameStoreInstance

