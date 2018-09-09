import { INITIAL_STATE } from '../'

describe('the exported constants', () => {

  test('that the initial state object is exported', () => {

    const expected_obj = [
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

    expect(INITIAL_STATE).toEqual(expected_obj)
  })
})
