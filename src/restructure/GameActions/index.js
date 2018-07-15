import dispatcher from '../../lib/dispatcher'
import OptionsStore from '../../restructure/OptionsStore.js'
import GameStore from '../../restructure/GameStore.js'
import optionsToGameState from './optionsToGameState.js'
import { validateOptions } from './validateOptions.js'
import progressPaths from './progressPaths.js'
import reducePlayerPaths from './reducePlayerPaths.js'

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
  const reduced_player_paths = reducePlayerPaths(GameStore.state)
  const progressed_paths = progressPaths(reduced_player_paths)
  const further_reduced_paths = progressed_paths.map(path_obj => path_obj.path)
  dispatcher.dispatch({
    type: 'UPDATE_PLAYER_PATHS',
    paths: further_reduced_paths
  })
}
