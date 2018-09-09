import { optionsConverter } from '../'

describe('the conversion of a player options object', () => {

  it('should convert a player options object without associating to or modifying the original object', () => {

    const options_in = {
      start_coord_x: '150',
      start_coord_y: '100',
      direction: '0',
      turn_left_keycode: '37',
      turn_right_keycode: '39',
      colour: 'rgba(255,0,0, 0.5)'
    }
    const options_in_preserve = { ...options_in }
    const expected_state = {
      start_coord_x: 150,
      start_coord_y: 100,
      direction: 0,
      turn_left_keycode: 37,
      turn_right_keycode: 39,
      colour: 'rgba(255,0,0, 0.5)'
    }
    const state = optionsConverter(options_in)

    expect(state).toEqual(expected_state)
    expect(state).not.toBe(expected_state)
    expect(options_in).not.toBe(options_in_preserve)
  })
})
