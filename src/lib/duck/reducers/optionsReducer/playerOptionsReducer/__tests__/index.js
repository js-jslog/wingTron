// @flow

import type { MatchOptions } from '~/common/flow-types'
import { EXAMPLE_OPTIONS } from '~/common/constants'
import { INITIAL_STATE } from '../constants'
import { playerOptionsReducer } from '../'

describe('the exceptional cases', () => {
  test('that the reducer returns the input state if no matching action types are found', () => {

    const state_in = [ ...INITIAL_STATE ]
    const unused_action = {
      type: 'START_GAME_FROM_OPTIONS',
      options: EXAMPLE_OPTIONS
    }
    const state_out = playerOptionsReducer(state_in, unused_action)

    expect(state_out).toBe(state_in)
  })

  test('that the reducer defines an initial state', () => {

    const unused_action = {
      type: 'START_GAME_FROM_OPTIONS',
      options: EXAMPLE_OPTIONS
    }
    const state_out = playerOptionsReducer(undefined, unused_action)
    const expected_state_out = INITIAL_STATE

    expect(state_out).toEqual(expected_state_out)
  })
})

describe('the add player logic', () => {
  test('that the add player reducer returns the existing state with an additional player', () => {

    const state_in = []
    const action = {
      type: 'ADD_PLAYER_TO_OPTIONS',
    }
    const state_out = playerOptionsReducer(state_in, action)

    expect(state_out.length).toBe(1)
  })

  // TODO: this test can be removed once I have managed to make the 
  // PlayerOptionsSet type definition immutable
  test('that the add player reducer operates without modifying the PlayerOptionsSet in the original state tree', () => {

    const state_in = []
    const action = {
      type: 'ADD_PLAYER_TO_OPTIONS'
    }
    const state_out = playerOptionsReducer(state_in, action)

    expect(state_in.length).toBe(0)
    expect(state_in).not.toBe(state_out)
  })
})

describe('the remove player logic', () => {
  test('that the remove player reducer returns the existing state minus the player at the appropriate index', () => {

    const state_in = [ 0, 1, 2, 3, 4 ]
    const expected_state = [ 0, 1, 3, 4 ]
    const removal_index = 2
    const action = {
      type: 'REMOVE_PLAYER_FROM_OPTIONS',
      index: removal_index
    }
    // $FlowFixMe
    const state_out = playerOptionsReducer(state_in, action)

    expect(state_out).toEqual(expected_state)
  })

  // TODO: this test can be removed once I have managed to make the 
  // PlayerOptionsSet type definition immutable
  test('that the remove player reducer does not modify the input state object\'s players property', () => {

    const state_in = [ 0, 1, 2, 3, 4 ]
    const removal_index = 3
    const action = {
      type: 'REMOVE_PLAYER_FROM_OPTIONS',
      index: removal_index
    }
    // $FlowFixMe
    const state_out = playerOptionsReducer(state_in, action)

    expect(state_in).toEqual([ 0, 1, 2, 3, 4 ])
    expect(state_out).toEqual([ 0, 1, 2, 4 ])
    expect(state_out).not.toBe(state_in)
  })
})
