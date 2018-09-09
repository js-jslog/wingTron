import * as ActionTypes from '~/duck/types/'
import { matchOptionsReducer } from '../'

describe('the exceptional cases', () => {

  test('that the reducer returns the input state if no matching action types are found', () => {

    const state_in = { existing: 'state' }
    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = matchOptionsReducer(state_in, unknown_action)

    expect(state_out).toBe(state_in)
  })

  test('that the reducer defines an initial state', () => {

    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = matchOptionsReducer(undefined, unknown_action)
    const expected_state_out = {
      field_width: '200',
      field_height: '200',
      matches: '10'
    }

    expect(state_out).toEqual(expected_state_out)
  })
})

describe('the handling of the update options action', () => {
  test('that the update options reducer returns the input options', () => {

    const input_options = {
      some: 'options',
      somemore: 'options',
    }
    const action = {
      type: ActionTypes.UPDATE_OPTIONS,
      options: input_options,
    }
    const state_out = matchOptionsReducer(undefined, action)

    expect(state_out).toEqual(input_options)
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
    const state_out = matchOptionsReducer(undefined, action)

    expect(state_out).not.toBe(input_options)
  })

  test('that the update options reducer returns a new root state object', () => {

    const state_in = {}
    const action = {
      type: ActionTypes.UPDATE_OPTIONS,
      options: {}
    }
    const state_out = matchOptionsReducer(state_in, action)

    expect(state_out).not.toBe(state_in)
  })
})

