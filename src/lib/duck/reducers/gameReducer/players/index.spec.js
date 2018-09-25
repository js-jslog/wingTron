// @flow

import { players } from './'
import { EXAMPLE_OPTIONS } from '~/common/constants'
import { EXAMPLE_PLAYERS } from './constants'
import * as PlayerOptionsToState from './playerOptionsToState'

describe('the exceptional usage', () => {

  test('that the reducer returns the input state if no matching action types are found', () => {

    const state_in = EXAMPLE_PLAYERS
    const unrelated_action = {
      type: 'UPDATE_OPTIONS',
      options: { ...EXAMPLE_OPTIONS }
    }
    const state_out = players(state_in, unrelated_action)

    expect(state_out).toBe(state_in)
  })

  test('that the reducer defines no initial state', () => {

    const unrelated_action = {
      type: 'UPDATE_OPTIONS',
      options: { ...EXAMPLE_OPTIONS }
    }
    const state_out = players(undefined, unrelated_action)

    expect(state_out).toBeFalsy()
  })
})
