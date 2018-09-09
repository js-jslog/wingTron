import { playerOptionsToState } from '../'

describe('the player options to game state transformation', () => {

  it('should leave the players options unchanged', () => {

    const options_in = [ { this: 'unchanged' } ]
    const expected_state = [ { this: 'unchanged' } ]
    const state_out = playerOptionsToState(options_in)

    expect(state_out).toEqual(expected_state)
  })

  it('should return a non-associative array with non-associative contents', () => {

    const player1 = { some: 'options' }
    const player2 = { another: 'option' }
    const options_in = [ player1, player2 ]
    const expected_state = [ player1, player2 ]
    const state_out = playerOptionsToState(options_in)

    expect(state_out).toEqual(expected_state)
    expect(state_out).not.toBe(expected_state)
    expect(state_out[0]).not.toBe(player1)
    expect(state_out[1]).not.toBe(player2)
  })
})
