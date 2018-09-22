// @flow

import { EXAMPLE_OPTIONS } from '~/common/constants'
import { rootReducer } from '~/duck/reducers'
import { createStore } from 'redux'

describe('the integration of all the reducers', () => {

  test('the default store state', () => {

    const store = createStore(rootReducer)
    const state = store.getState()

    expect(state).toMatchSnapshot()
  })

  test('the store after a game start', () => {

    const store = createStore(rootReducer)
    const state = store.getState()
    const action = {
      type: 'START_GAME_FROM_OPTIONS',
      options: state.options
    }
    store.dispatch(action)
    
    expect(store.getState()).toMatchSnapshot()
  })

  test('the store after a game is created and progressed a few steps', () => {

    const store = createStore(rootReducer)

    const start_game_action = {
      type: 'START_GAME_FROM_OPTIONS',
      options: store.getState().options
    }
    store.dispatch(start_game_action)

    const progress_paths_action = {
      type: 'PROGRESS_PLAYER_PATHS',
      players: store.getState().game.players
    }
    store.dispatch(progress_paths_action)
    progress_paths_action.players = store.getState().game.players
    store.dispatch(progress_paths_action)
    progress_paths_action.players = store.getState().game.players
    store.dispatch(progress_paths_action)
    progress_paths_action.players = store.getState().game.players
    store.dispatch(progress_paths_action)

    expect(store.getState()).toMatchSnapshot()
  })
})

