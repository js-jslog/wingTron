import * as ActionTypes from '~/duck/types/'
import { optionsReducer } from '../'

describe('the exceptional cases', () => {

  test('that the reducer returns a similar state object to it\'s parameter when no matching action type is found', () => {

    const state_in = {
      match: 'something',
      players: 'something else'
    }
    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = optionsReducer(state_in, unknown_action)

    expect(state_out).toEqual(state_in)
  })

  test('that the reducer returns an initial state when no input state is provided', () => {

    const expected_state = {
      match: {
        field_width: '200',
        field_height: '200',
        matches: '10'
      },
      players: [
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
    }
    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = optionsReducer(undefined, unknown_action)

    expect(state_out).toEqual(expected_state)
  })
})
