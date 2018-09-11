// @flow

import { matchOptionsToState } from '../'
import { EXAMPLE_GAME_MATCH, EXAMPLE_MATCH_OPTIONS } from '~/common/constants'

describe('the options to game state transformation', () => {

  test('that the input object is not returned identically', () => {

    const options_in = { ...EXAMPLE_MATCH_OPTIONS }
    const state_out = matchOptionsToState(options_in)

    expect(state_out).not.toBe(options_in)
  })

  it('should convert all property values to integers', () => {

    const options_in = { ...EXAMPLE_MATCH_OPTIONS }
    const expected_state = { ...EXAMPLE_GAME_MATCH }
    const state_out = matchOptionsToState(options_in)

    expect(state_out).toEqual(expected_state)
  })
})
