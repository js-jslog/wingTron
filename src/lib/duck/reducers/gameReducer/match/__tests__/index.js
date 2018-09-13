// @flow

import { match } from '../'
import { EXAMPLE_GAME_MATCH, EXAMPLE_MATCH_OPTIONS } from '~/common/constants'
import * as ActionTypes from '~/duck/types/'

describe('the exceptional usage', () => {

  test('that the reducer returns the input state if no matching action types are found', () => {

    const state_in = { ...EXAMPLE_GAME_MATCH }
    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = match(state_in, unknown_action)

    expect(state_out).toBe(state_in)
  })

  test('that the reducer defines no initial state', () => {

    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = match(undefined, unknown_action)

    expect(state_out).toBeFalsy()
  })
})

describe('the reducers response to the start game action', () => {

  test('that the output state is a non-associative copy of the input options with the values parsed to integers', () => {

    const state_in = { ...EXAMPLE_GAME_MATCH }
    state_in.field_width = 0
    state_in.field_height = 0
    state_in.matches = 0
    const options = { ...EXAMPLE_MATCH_OPTIONS }
    const expected_state = { ...EXAMPLE_GAME_MATCH }
    const action = {
      type: ActionTypes.START_GAME_FROM_OPTIONS,
      options: options
    }
    const state_out = match(state_in, action)

    expect(state_out).toEqual(expected_state)
    expect(state_out).not.toBe(options)
  })
})
