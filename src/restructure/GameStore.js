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

  startGameHandler(state) {
    this.state = JSON.parse(JSON.stringify(state))
  }

  updatePlayerPathsHandler(paths) {
    paths.forEach((path, index) => this.state.player_state[index].path = path)
  }

  updatePlayerDirectionsHandler(directions) {
    directions.forEach((direction, index) => this.state.player_state[index].direction = direction)
  }

  updateCollisionMatrixHandler(matrix) {
    this.state.collision_matrix = JSON.parse(JSON.stringify(matrix))
    this.emit('collision_matrix_updated')
  }

  handleActions(action) {
    switch(action.type) {
      case 'START_NEW_GAME':
        this.startGameHandler(action.state)
        break
      case 'UPDATE_PLAYER_PATHS':
        this.updatePlayerPathsHandler(action.paths)
        break
      case 'UPDATE_PLAYER_DIRECTIONS':
        this.updatePlayerDirectionsHandler(action.directions)
        break
      case 'UPDATE_COLLISION_MATRIX':
        this.updateCollisionMatrixHandler(action.matrix)
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

