// @flow

// TODO: have these tests use action creators instead of
// manually rolling the actions
import { EXAMPLE_OPTIONS } from '~/common/constants'
import { rootReducer } from '~/duck/reducers'
import { createStore } from 'redux'
import { progressPlayerPaths } from '~/duck/actions'
import { startGameFromOptions } from '~/duck/actions'
import { handleKeyEvent } from '~/duck/actions'

describe('the integration of all the reducers', () => {

  test('the default store state', () => {

    const store = createStore(rootReducer)
    const state = store.getState()

    expect(state).toMatchSnapshot()
  })

  test('the store after a game start', () => {

    const store = createStore(rootReducer)
    store.dispatch(startGameFromOptions(store.getState().options))
    
    expect(store.getState()).toMatchSnapshot()
  })

  test('the store after a game is created and progressed a few steps', () => {

    const store = createStore(rootReducer)

    store.dispatch(startGameFromOptions(store.getState().options))

    store.dispatch(progressPlayerPaths(store.getState().game.players))
    store.dispatch(progressPlayerPaths(store.getState().game.players))
    store.dispatch(progressPlayerPaths(store.getState().game.players))
    store.dispatch(progressPlayerPaths(store.getState().game.players))

    expect(store.getState()).toMatchSnapshot()
  })

  test('the store after a game is created and progressed a few steps with some turns', () => {

    const p0_turn_left_event = {
      type: 'keydown',
      keyCode: 37
    }
    const p1_turn_left_event = {
      type: 'keydown',
      keyCode: 65
    }
    const p0_turn_right_event = {
      type: 'keydown',
      keyCode: 37
    }
    const p1_turn_right_event = {
      type: 'keydown',
      keyCode: 65
    }
    const store = createStore(rootReducer)

    store.dispatch(startGameFromOptions(store.getState().options))

    store.dispatch(progressPlayerPaths(store.getState().game.players))
    store.dispatch(progressPlayerPaths(store.getState().game.players))
    store.dispatch(progressPlayerPaths(store.getState().game.players))
    store.dispatch(progressPlayerPaths(store.getState().game.players))

    store.dispatch(handleKeyEvent(p0_turn_left_event, store.getState().game.players))
    store.dispatch(handleKeyEvent(p1_turn_left_event, store.getState().game.players))
    store.dispatch(progressPlayerPaths(store.getState().game.players))
    store.dispatch(progressPlayerPaths(store.getState().game.players))
    store.dispatch(progressPlayerPaths(store.getState().game.players))

    store.dispatch(handleKeyEvent(p0_turn_right_event, store.getState().game.players))
    store.dispatch(handleKeyEvent(p1_turn_right_event, store.getState().game.players))
    store.dispatch(progressPlayerPaths(store.getState().game.players))
    store.dispatch(progressPlayerPaths(store.getState().game.players))
    store.dispatch(progressPlayerPaths(store.getState().game.players))

    expect(store.getState()).toMatchSnapshot()
  })
})

