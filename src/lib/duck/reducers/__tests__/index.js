import * as ActionTypes from '~/duck/types/'
import { reducer } from '../'

describe('the reducer', () => {

  test('that the reducer returns the input state if no matching action types are found', () => {

    const input_state = { existing: 'state' }
    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const returned_state = reducer(input_state, unknown_action)

    expect(returned_state).toBe(input_state)
  })

  test('that the reducer defines an initial state', () => {

    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const returned_state = reducer(undefined, unknown_action)

    expect(returned_state).toBeTruthy()
  })

  test('that the update options reducer returns the input options', () => {

    const input_options = {
      some: 'options',
      somemore: 'options',
    }
    const action = {
      type: ActionTypes.UPDATE_OPTIONS,
      options: input_options,
    }
    const returned_state = reducer(undefined, action)

    expect(returned_state).toEqual(input_options)
  })

  test('that the update options reducer returns a non associative copy of the input options', () => {

    const input_options = {
      some: 'options',
      somemore: 'options',
    }
    const action = {
      type: ActionTypes.UPDATE_OPTIONS,
      options: input_options,
    }
    const returned_state = reducer(undefined, action)

    expect(returned_state).not.toBe(input_options)
  })

  test('that the add player reducer returns the existing state with an additional player', () => {

    const state_in = {
      players: []
    }
    const action = {
      type: ActionTypes.ADD_PLAYER_TO_OPTIONS,
    }
    const state_out = reducer(state_in, action)

    expect(state_out.players.length).toBe(1)
  })

  test('that the add player reducer operates without modifying the players array in the original state tree', () => {

    const state_in = {
      players: []
    }
    const action = {
      type: ActionTypes.ADD_PLAYER_TO_OPTIONS
    }
    reducer(state_in, action)

    expect(state_in.players.length).toBe(0)
  })

  test('that the remove player reducer returns the existing state minus the player at the appropriate index', () => {

    const state_in = {
      players: [ 0, 1, 2, 3, 4 ]
    }
    const expected_state = {
      players: [ 0, 1, 3, 4 ]
    }
    const removal_index = 2
    const action = {
      type: ActionTypes.REMOVE_PLAYER_FROM_OPTIONS,
      index: removal_index
    }
    const state_out = reducer(state_in, action)

    expect(state_out).toEqual(expected_state)
  })

  test('that the remove player reducer operates without modifying the original state tree', () => {

    const state_in = {
      players: [ 0, 1, 2, 3, 4 ]
    }
    const removal_index = 2
    const action = {
      type: ActionTypes.REMOVE_PLAYER_FROM_OPTIONS,
      index: removal_index
    }
    const state_out = reducer(state_in, action)

    expect(state_out).not.toBe(state_in)
  })
})
