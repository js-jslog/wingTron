import * as ActionTypes from '~/duck/types/'
import { playerOptionsReducer } from '../'

describe('the exceptional cases', () => {
  test('that the reducer returns the input state if no matching action types are found', () => {

    const state_in = [ 1, 2, 3, 4 ]
    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = playerOptionsReducer(state_in, unknown_action)

    expect(state_out).toBe(state_in)
  })

  test('that the reducer defines an initial state', () => {

    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = playerOptionsReducer(undefined, unknown_action)
    const expected_state_out = [
      {
        start_coord_x: '150',
        start_coord_y: '100',
        direction: '0',
        turn_left_keycode: '37',
        turn_right_keycode: '39',
        colour: 'rgba(255,0,0, 0.5)',
      },
      {
        start_coord_x: '150',
        start_coord_y: '100',
        direction: '' + Math.PI,
        turn_left_keycode: '65',
        turn_right_keycode: '68',
        colour: 'rgba(0,0,255, 0.5)',
      }
    ]

    expect(state_out).toEqual(expected_state_out)
  })
})

describe('the add player logic', () => {
  test('that the add player reducer returns the existing state with an additional player', () => {

    const state_in = []
    const action = {
      type: ActionTypes.ADD_PLAYER_TO_OPTIONS,
    }
    const state_out = playerOptionsReducer(state_in, action)

    expect(state_out.length).toBe(1)
  })

  test('that the add player reducer operates without modifying the players array in the original state tree', () => {

    const state_in = []
    const action = {
      type: ActionTypes.ADD_PLAYER_TO_OPTIONS
    }
    playerOptionsReducer(state_in, action)

    expect(state_in.length).toBe(0)
  })

  test('that the add player reducer returns a new root object', () => {

    const state_in = []
    const action = {
      type: ActionTypes.ADD_PLAYER_TO_OPTIONS
    }
    const state_out = playerOptionsReducer(state_in, action)

    expect(state_in).not.toBe(state_out)
  })
})

describe('the remove player logic', () => {
  test('that the remove player reducer returns the existing state minus the player at the appropriate index', () => {

    const state_in = [ 0, 1, 2, 3, 4 ]
    const expected_state = [ 0, 1, 3, 4 ]
    const removal_index = 2
    const action = {
      type: ActionTypes.REMOVE_PLAYER_FROM_OPTIONS,
      index: removal_index
    }
    const state_out = playerOptionsReducer(state_in, action)

    expect(state_out).toEqual(expected_state)
  })

  test('that the remove player reducer does not modify the input state object\'s players property', () => {

    const state_in = [ 0, 1, 2, 3, 4 ]
    const removal_index = 3
    const action = {
      type: ActionTypes.REMOVE_PLAYER_FROM_OPTIONS,
      index: removal_index
    }
    const state_out = playerOptionsReducer(state_in, action)

    expect(state_in).toEqual([ 0, 1, 2, 3, 4 ])
    expect(state_out).toEqual([ 0, 1, 2, 4 ])
  })

  test('that the remove player reducer returns a new root object', () => {

    const state_in = [ 0, 1, 2, 3, 4 ]
    const removal_index = 2
    const action = {
      type: ActionTypes.REMOVE_PLAYER_FROM_OPTIONS,
      index: removal_index
    }
    const state_out = playerOptionsReducer(state_in, action)

    expect(state_out).not.toBe(state_in)
  })
})
