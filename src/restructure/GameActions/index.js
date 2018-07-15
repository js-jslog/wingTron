import dispatcher from '../../lib/dispatcher'
import OptionsStore from '../../restructure/OptionsStore.js'
import GameStore from '../../restructure/GameStore.js'
import optionsToGameState from './optionsToGameState.js'

export function startNewGame() {
  const game_state = optionsToGameState(OptionsStore.options)
  game_state.status = GameStore.RUNNING
  dispatcher.dispatch({
    type: 'START_NEW_GAME',
    state: game_state,
  })
}

