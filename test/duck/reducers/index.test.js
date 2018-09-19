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
})

