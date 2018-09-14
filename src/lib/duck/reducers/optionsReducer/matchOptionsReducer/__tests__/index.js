// @flow

import type { MatchOptions } from '~/common/flow-types'
import { EXAMPLE_MATCH_OPTIONS } from '~/common/constants'
import { INITIAL_STATE } from '../constants'
import { matchOptionsReducer } from '../'

describe('the exceptional cases', () => {

  test('that the reducer returns the input state if no matching action types are found', () => {

    const state_in = { ...EXAMPLE_MATCH_OPTIONS }
    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = matchOptionsReducer(state_in, unknown_action)

    expect(state_out).toBe(state_in)
  })

  test('that the reducer defines an initial state', () => {

    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = matchOptionsReducer(undefined, unknown_action)

    expect(state_out).toEqual(INITIAL_STATE)
  })
})

describe('the handling of the update options action', () => {
  test('that the update options reducer returns the input options', () => {

    const input_options = { ...EXAMPLE_MATCH_OPTIONS }
    const action = {
      type: 'UPDATE_OPTIONS',
      options: input_options,
    }
    const state_out = matchOptionsReducer(undefined, action)

    expect(state_out).toEqual(input_options)
  })

  test('that the update options reducer returns a non associative copy of the input options', () => {

    const input_options = { ...EXAMPLE_MATCH_OPTIONS }
    const action = {
      type: 'UPDATE_OPTIONS',
      options: input_options,
    }
    const state_out = matchOptionsReducer(undefined, action)

    expect(state_out).not.toBe(input_options)
  })
})
