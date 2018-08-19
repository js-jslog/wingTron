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

  startNewGame(state) {
    this.state = JSON.parse(JSON.stringify(state))
  }

  updatePlayerPaths(paths) {
    paths.forEach((path, index) => this.state.player_state[index].path = path)
  }

  updatePlayerDirections(directions) {
    directions.forEach((direction, index) => this.state.player_state[index].direction = direction)
  }

  updateCollisionMatrix(matrix) {
    this.state.collision_matrix = JSON.parse(JSON.stringify(matrix))
    this.emit('collision_matrix_updated')
  }

  handleActions(action) {
    switch(action.type) {
      case 'START_NEW_GAME':
        this.startNewGame(action.state)
        break
      case 'UPDATE_PLAYER_PATHS':
        this.updatePlayerPaths(action.paths)
        break
      case 'UPDATE_PLAYER_DIRECTIONS':
        this.updatePlayerDirections(action.directions)
        break
      case 'UPDATE_COLLISION_MATRIX':
        this.updateCollisionMatrix(action.matrix)
        break
    }
  }
}

const getPathsFromGameState = (state) => {
  return state.player_state.map(ps => ps.path)
}

const addPathNode = (path) => {
  path.unshift([].slice.call(path[0], 0))
}

const GameStoreInstance = new GameStore
dispatcher.register(GameStoreInstance.handleActions.bind(GameStoreInstance))

export default GameStoreInstance

