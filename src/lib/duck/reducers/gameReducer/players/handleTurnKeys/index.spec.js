// @flow

import { EXAMPLE_PLAYERS } from '~/common/constants'
import { handleTurnKeys } from './'
import * as TurnPlayer90 from './turnPlayer90'

describe('the handling of turn key presses', () => {

  it('should return the input players object if it is not a keydown event', () => {

    const players_in = EXAMPLE_PLAYERS
    const event = {
      type: 'keyup',
      keyCode: 37
    }

    const players_out = handleTurnKeys(event, players_in)

    expect(players_out).toBe(players_in)
  })

  it('should pass \'LEFT\' to the turnPlayer90 function if keyCode matches a player\'s left turn key', () => {

    const players_in = EXAMPLE_PLAYERS
    const event = {
      type: 'keydown',
      keyCode: 37
    }

    const turnPlayer90Spy = jest.spyOn(TurnPlayer90, 'turnPlayer90')

    handleTurnKeys(event, players_in)

    expect(turnPlayer90Spy).toHaveBeenCalledWith('LEFT', expect.any(Object))
  })

  it('should return the input players object if there are no matching turn keys', () => {

    const players_in = EXAMPLE_PLAYERS
    const event = {
      type: 'keydown',
      keyCode: 9999999
    }

    const players_out = handleTurnKeys(event, players_in)

    expect(players_out).toBe(players_in)
  })

  it('should return a new object if any matches are found', () => {

    const players_in = EXAMPLE_PLAYERS
    const event = {
      type: 'keydown',
      keyCode: 37
    }

    const players_out = handleTurnKeys(event, players_in)

    expect(players_out).not.toEqual(players_in)
  })

})

