import dispatcher from '../../lib/dispatcher'
import OptionsStore from '../../restructure/OptionsStore.js'
import GameStore from '../../restructure/GameStore.js'
import optionsToGameState from './optionsToGameState.js'
import { validateOptions } from './validateOptions.js'
import progressPaths from './progressPaths.js'
import { reducePlayerStates } from './reduceGameStoreState.js'
import calculateCollisionMatrix from './calculateCollisionMatrix.js'

export function startNewGame() {
  if (!OptionsStore.options || !validateOptions(OptionsStore.options)) {
    return
  }
  const game_state = optionsToGameState(OptionsStore.options)
  game_state.status = GameStore.RUNNING

  dispatcher.dispatch({
    type: 'START_NEW_GAME',
    state: game_state,
  })
}

export function updatePlayerPaths() {
  const paths_obj = {
    paths: reducePlayerStates(GameStore.state.player_state, 'path'),
    directions: reducePlayerStates(GameStore.state.player_state, 'direction'),
  }
  const progressed_paths = progressPaths(paths_obj)

  dispatcher.dispatch({
    type: 'UPDATE_PLAYER_PATHS',
    paths: progressed_paths,
  })
}

export function updateCollisionMatrix() {
  const player_paths = reducePlayerStates(GameStore.state.player_state, 'path')
  const collision_matrix = calculateCollisionMatrix(player_paths)

  if (GameStore.state.collision_matrix && matricesMatch(collision_matrix, GameStore.state.collision_matrix)) {
    return
  }
  dispatcher.dispatch({
    type: 'UPDATE_COLLISION_MATRIX',
    matrix: collision_matrix,
  })
}

const matricesMatch = (matrix1, matrix2) => (
  (JSON.stringify(matrix1)) === JSON.stringify(matrix2)
)
