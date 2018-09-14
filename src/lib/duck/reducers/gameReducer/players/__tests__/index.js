import { players } from '../'

describe('the exceptional usage', () => {

  test('that the reducer returns the input state if no matching action types are found', () => {

    const state_in = [ { existing: 'state' } ]
    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = players(state_in, unknown_action)

    expect(state_out).toBe(state_in)
  })

  test('that the reducer defines no initial state', () => {

    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = players(undefined, unknown_action)

    expect(state_out).toBeFalsy()
  })
})

describe('the reducers response to the start game action', () => {

  test('that a new state is produced', () => {

    const state_in = [ { existing: 'state' } ]
    //TODO: place this in a commons constants file
    const options =  {
      players: [
        {
          start_coord_x: '150',
          start_coord_y: '100',
          direction: '0',
          turn_left_keycode: '37',
          turn_right_keycode: '39',
          colour: 'rgba(255,0,0, 0.5)'
        }
      ]
    }

    const action = {
      type: 'START_GAME_FROM_OPTIONS',
      options: options
    }
    const state_out = players(state_in, action)

    expect(state_out).not.toEqual(state_in)
  })
})
