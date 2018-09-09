import * as ActionTypes from '~/duck/types/'
import { gameReducer } from '../index.js'

describe('the gameReducer', () => {

  test('that the reducer exists', () => {

    expect(gameReducer).toBeTruthy()
  })

  test('that the reducer returns the input state if no matching action types are found', () => {

    const state_in = { existing: 'state' }
    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = gameReducer(state_in, unknown_action)

    expect(state_out).toBe(state_in)
  })

  test('that the reducer defines an initial state', () => {

    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = gameReducer(undefined, unknown_action)
    const expected_state_out = {
      game_state: 'NOT_RUNNING',
    }

    expect(state_out).toEqual(expected_state_out)
  })
})

describe('the reducers response to the start game action', () => {

  it('should produce a state which is a copy of the options attached to the action', () => {

    const options = {
      new: 'options'
    }
    const action = {
      type: ActionTypes.START_GAME_FROM_OPTIONS,
      options: options
    }
    const state_out = gameReducer(undefined, action)

    expect(state_out).toEqual(options)
  })
})
