import { matchOptionsToState } from '../'

describe('the options to game state transformation', () => {

  test('that the input object is not returned identically', () => {

    const options_in = {
      first: '1',
      second: '2',
      third: '3'
    }
    const state_out = matchOptionsToState(options_in)

    expect(state_out).not.toBe(options_in)
  })

  it('should convert all property values to integers', () => {

    const options_in = {
      first: '1',
      second: '2'
    }
    const expected_state = {
      first: 1,
      second: 2
    }
    const state_out = matchOptionsToState(options_in)

    expect(state_out).toEqual(expected_state)
  })
})
