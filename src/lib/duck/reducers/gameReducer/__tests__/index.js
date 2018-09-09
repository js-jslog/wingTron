import { gameReducer } from '../'

// TODO: are these the tests that we need here? Do we also want integration tests
describe('the gameReducer', () => {

  test('that the reducer returns the input state if no matching action types are found', () => {

    const state_in = {
      match: {},
      players: [ 1, 2, 3, 4 ]
    }
    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = gameReducer(state_in, unknown_action)

    expect(state_out).toEqual(state_in)
    expect(state_out.match).toBe(state_in.match)
    expect(state_out.players).toBe(state_in.players)
  })

  test('that the reducer defines no initial state', () => {

    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const expected_state = {
      match: undefined,
      players: undefined
    }
    const state_out = gameReducer(undefined, unknown_action)

    expect(state_out).toEqual(expected_state)
  })
})
