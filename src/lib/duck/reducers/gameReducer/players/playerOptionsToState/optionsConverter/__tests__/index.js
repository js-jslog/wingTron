// @flow

import { optionsConverter } from '../'
import { EXAMPLE_OPTIONS, EXAMPLE_PLAYERS } from '~/common/constants'

describe('the conversion of a player options object', () => {

  it('should convert a player options object without associating to or modifying the original object', () => {

    const options_in = EXAMPLE_OPTIONS.players[1]
    const expected_state = EXAMPLE_PLAYERS.byId['1']
    const state = optionsConverter(options_in, 1)

    expect(state).toEqual(expected_state)
    expect(state).not.toBe(expected_state)
  })
})
