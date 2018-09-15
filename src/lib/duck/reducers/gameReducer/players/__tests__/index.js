// @flow

import { players } from '../'
import { EXAMPLE_OPTIONS } from '~/common/constants'
import { EXAMPLE_GAME_PLAYER1 } from '~/common/constants'
import { EXAMPLE_GAME_PLAYER2 } from '~/common/constants'
import * as PlayerOptionsToState from '../playerOptionsToState'

describe('the exceptional usage', () => {

  test('that the reducer returns the input state if no matching action types are found', () => {

    const state_in = [
      { ...EXAMPLE_GAME_PLAYER1 },
      { ...EXAMPLE_GAME_PLAYER2 }
    ]
    const unrelated_action = {
      type: 'UPDATE_OPTIONS',
      options: { ...EXAMPLE_OPTIONS }
    }
    const state_out = players(state_in, unrelated_action)

    expect(state_out).toBe(state_in)
  })

  test('that the reducer defines no initial state', () => {

    const unrelated_action = {
      type: 'UPDATE_OPTIONS',
      options: { ...EXAMPLE_OPTIONS }
    }
    const state_out = players(undefined, unrelated_action)

    expect(state_out).toBeFalsy()
  })
})

describe('the reducers response to the start game action', () => {

  test('that the playerOptionsToState function is called', () => {

    const spy = jest.spyOn(PlayerOptionsToState, 'playerOptionsToState')

    const state_in = [{ ...EXAMPLE_GAME_PLAYER1 }]
 
    const options =  { ...EXAMPLE_OPTIONS }

    const action = {
      type: 'START_GAME_FROM_OPTIONS',
      options: options
    }

    const state_out = players(state_in, action)

    expect(spy).toBeCalledTimes(1)
  })
})
