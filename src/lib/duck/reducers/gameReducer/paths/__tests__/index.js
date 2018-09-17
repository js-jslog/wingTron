// @flow

import { paths } from '../'
import { EXAMPLE_PATHS } from '../constants'

describe('the paths reducer', () => {

  it('should return the input state if no matching action types are found', () => {

    const state_in = EXAMPLE_PATHS
    const unrelated_action = { type: 'ADD_PLAYER_TO_OPTIONS' }
    const state_out = paths(state_in, unrelated_action)

    expect(state_out).toBe(state_in)
  })

  it('should define no initial state', () => {

    const unrelated_action = { type: 'ADD_PLAYER_TO_OPTIONS' }
    const state_out = paths(undefined, unrelated_action)

    expect(state_out).toBeFalsy()
  })
})
