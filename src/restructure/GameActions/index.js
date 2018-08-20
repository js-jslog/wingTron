import dispatcher from '../../lib/dispatcher'
import OptionsStore from '../../restructure/OptionsStore.js'
import GameStore from '../../restructure/GameStore.js'
import optionsToGameState from './optionsToGameState.js'
import { validateOptions } from './validateOptions.js'
import progressPaths from './progressPaths.js'
import { reducePlayerStates } from './reduceGameStoreState.js'
import calculateCollisionMatrix from './calculateCollisionMatrix.js'
import DEATH from './DEATH.js'

export function startGameAction() {
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

export function updatePlayerPathsAction() {
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

export function updateCollisionMatrixAction() {
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

export function updatePlayerDeaths() {

  const collision_matrix = GameStore.state.collision_matrix
  const current_player_death_states = reducePlayerStates(GameStore.state.player_state, 'dead')
  const deaths = DEATH(collision_matrix, current_player_death_states)

  dispatcher.dispatch({
    type: 'UPDATE_PLAYER_DEATHS',
    deaths: deaths,
  })
}

export function handleKeyEvents(evt) {
  const paths_obj = {
    paths: reducePlayerStates(GameStore.state.player_state, 'path'),
    turn_left_keycode: reducePlayerStates(GameStore.state.player_state, 'turn_left_keycode'),
    turn_right_keycode: reducePlayerStates(GameStore.state.player_state, 'turn_right_keycode'),
    directions: reducePlayerStates(GameStore.state.player_state, 'direction'),
  }
  paths_obj.turn_left_keycode.forEach((val, index) => {
    if (evt.keyCode === val) {
      paths_obj.paths[index].unshift([].slice.call(paths_obj.paths[index][0], 0))
      paths_obj.directions[index] -= (Math.PI * 0.5)
    }
  })
  paths_obj.turn_right_keycode.forEach((val, index) => {
    if (evt.keyCode === val) {
      paths_obj.paths[index].unshift([].slice.call(paths_obj.paths[index][0], 0))
      paths_obj.directions[index] += (Math.PI * 0.5)
    }
  })

  dispatcher.dispatch({
    type: 'UPDATE_PLAYER_PATHS',
    paths: paths_obj.paths,
  })

  dispatcher.dispatch({
    type: 'UPDATE_PLAYER_DIRECTIONS',
    directions: paths_obj.directions,
  })
}
