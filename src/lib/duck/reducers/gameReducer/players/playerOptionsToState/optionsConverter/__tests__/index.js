// @flow

import { optionsConverter } from '../'
import { EXAMPLE_PLAYER2_OPTIONS, EXAMPLE_GAME_PLAYER2 } from '~/common/constants'

describe('the conversion of a player options object', () => {

  it('should convert a player options object without associating to or modifying the original object', () => {

    const options_in = { ...EXAMPLE_PLAYER2_OPTIONS }
    const options_in_preserve = { ...options_in }
    const expected_state = { ...EXAMPLE_GAME_PLAYER2 }
    const state = optionsConverter(options_in)

    expect(state).toEqual(expected_state)
    expect(state).not.toBe(expected_state)
    expect(options_in).not.toBe(options_in_preserve)
  })
})
