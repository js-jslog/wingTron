// @flow

import { matchOptionsToState } from './'
import { EXAMPLE_MATCH, EXAMPLE_OPTIONS } from '~/common/constants'

describe('the options to game state transformation', () => {

  test('that the input object is not returned identically', () => {

    const options_in = EXAMPLE_OPTIONS.match
    const state_out = matchOptionsToState(options_in)

    expect(state_out).not.toBe(options_in)
  })

  it('should convert all property values to integers', () => {

    const options_in = EXAMPLE_OPTIONS.match
    const expected_state = EXAMPLE_MATCH
    const state_out = matchOptionsToState(options_in)

    expect(state_out).toEqual(expected_state)
  })
})
