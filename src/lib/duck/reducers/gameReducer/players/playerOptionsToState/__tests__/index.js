// @flow

import { EXAMPLE_PLAYER1_OPTIONS, EXAMPLE_PLAYER2_OPTIONS, EXAMPLE_GAME_PLAYER1, EXAMPLE_GAME_PLAYER2 } from '~/common/constants'
import { playerOptionsToState } from '../'

// TODO: this test shouldn't really get specific about the values coming back
// That test is already covered by the function this itself calls
// We really only need to test that the utility function is called
describe('the player options to game state transformation', () => {

  it('should return a non-associative array with non-associative contents', () => {

    const player1 = { ...EXAMPLE_PLAYER1_OPTIONS }
    const player2 = { ...EXAMPLE_PLAYER2_OPTIONS }
    const options_in = [ player1, player2 ]
    const expected_state = [ { ...EXAMPLE_GAME_PLAYER1 }, { ...EXAMPLE_GAME_PLAYER2 } ]
    const state_out = playerOptionsToState(options_in)

    expect(state_out).toEqual(expected_state)
    expect(state_out).not.toBe(expected_state)
    expect(state_out[0]).not.toBe(player1)
    expect(state_out[1]).not.toBe(player2)
  })
})
