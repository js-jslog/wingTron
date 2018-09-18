// @flow

import { EXAMPLE_OPTIONS } from '~/common/constants'
import { playerOptionsToState } from '../'
import * as OptionsConverter from '../optionsConverter'

// TODO: add more tests
describe('the player options to game state transformation', () => {

  it('should call the optionsConverter once for each player', () => {

    const options_in = [
      EXAMPLE_OPTIONS.players[0],
      EXAMPLE_OPTIONS.players[1],
    ]
    const spy = jest.spyOn(OptionsConverter, 'optionsConverter')
    const state_out = playerOptionsToState(options_in)

    expect(spy).toHaveBeenCalledTimes(2)
  })
})
