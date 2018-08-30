import { EventEmitter } from 'events'
import dispatcher from '~/dispatcher.js'

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
    this.emit('new_game_started')
  }

  updatePlayerPathsHandler(paths) {
    paths.forEach((path, index) => this.state.player_state[index].path = path)
  }

  updatePlayerDirectionsHandler(directions) {
    directions.forEach((direction, index) => this.state.player_state[index].direction = direction)
  }

  updateCollisionMatrixHandler(matrix) {
    const new_collision_matrix = JSON.parse(JSON.stringify(matrix))
    this.state.collision_matrix = new_collision_matrix
    this.emit('collision_matrix_updated', new_collision_matrix)
  }

  updatePlayerDeathsHandler(deaths) {
    deaths.forEach((dead, index) => {
      this.state.player_state[index].dead = dead
    })
    this.emit('player_deaths_updated', deaths)
  }

  updatePlayerScoresHandler(scores) {
    scores.forEach((score, index) => {
      this.state.player_state[index].score = score
    })
    this.emit('player_scores_updated')
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
      case 'UPDATE_PLAYER_DEATHS':
        this.updatePlayerDeathsHandler(action.deaths)
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

