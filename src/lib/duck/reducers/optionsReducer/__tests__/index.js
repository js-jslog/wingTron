import * as ActionTypes from '~/duck/types/'
import { optionsReducer } from '../index.js'

describe('the optionsReducer', () => {

  test('that the reducer returns the input state if no matching action types are found', () => {

    const state_in = { existing: 'state' }
    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = optionsReducer(state_in, unknown_action)

    expect(state_out).toBe(state_in)
  })

  test('that the reducer defines an initial state', () => {

    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    const state_out = optionsReducer(undefined, unknown_action)
    const expected_state_out = {
      field_width: '200',
      field_height: '200',
      matches: '10',
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
        },
      ]
    }

    expect(state_out).toEqual(expected_state_out)
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
    const state_out = optionsReducer(undefined, action)

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
    const state_out = optionsReducer(undefined, action)

    expect(state_out).not.toBe(input_options)
  })

  test('that the update options reducer returns a new root state object', () => {

    const state_in = {}
    const action = {
      type: ActionTypes.UPDATE_OPTIONS,
      options: {}
    }
    const state_out = optionsReducer(state_in, action)

    expect(state_out).not.toBe(state_in)
  })
})
