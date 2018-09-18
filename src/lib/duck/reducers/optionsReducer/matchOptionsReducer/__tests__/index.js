// @flow

import { EXAMPLE_OPTIONS } from '~/common/constants'
import { INITIAL_STATE } from '../constants'
import { matchOptionsReducer } from '../'

describe('the exceptional cases', () => {

  test('that the reducer returns the input state if no matching action types are found', () => {

    const state_in = INITIAL_STATE
    const unused_action = {
      type: 'START_GAME_FROM_OPTIONS',
      options: EXAMPLE_OPTIONS
    }
    const state_out = matchOptionsReducer(state_in, unused_action)

    expect(state_out).toBe(state_in)
  })

  test('that the reducer defines an initial state', () => {

    const unused_action = {
      type: 'START_GAME_FROM_OPTIONS',
      options: EXAMPLE_OPTIONS
    }
    const state_out = matchOptionsReducer(undefined, unused_action)

    expect(state_out).toEqual(INITIAL_STATE)
  })
})

describe('the handling of the update options action', () => {
  test('that the update options reducer returns the input options', () => {

    const input_options = EXAMPLE_OPTIONS
    const action = {
      type: 'UPDATE_OPTIONS',
      options: input_options,
    }
    const state_out = matchOptionsReducer(undefined, action)

    expect(state_out).toEqual(input_options.match)
  })

  test('that the update options reducer returns a non associative copy of the input options', () => {

    const input_options = { ...EXAMPLE_OPTIONS }
    const action = {
      type: 'UPDATE_OPTIONS',
      options: input_options,
    }
    const state_out = matchOptionsReducer(undefined, action)

    expect(state_out).not.toBe(input_options)
  })
})
