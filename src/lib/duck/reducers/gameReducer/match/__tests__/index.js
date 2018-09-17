// @flow

import { match } from '../'
import { EXAMPLE_GAME_MATCH, EXAMPLE_OPTIONS } from '~/common/constants'
import * as MatchOptionsToState from '../matchOptionsToState'

describe('the exceptional usage', () => {

  test('that the reducer returns the input state if no matching action types are found', () => {

    const state_in = { ...EXAMPLE_GAME_MATCH }
    const unused_action = { type: 'ADD_PLAYER_TO_OPTIONS' }
    const state_out = match(state_in, unused_action)

    expect(state_out).toBe(state_in)
  })

  test('that the reducer defines no initial state', () => {

    const unused_action = { type: 'ADD_PLAYER_TO_OPTIONS' }
    const state_out = match(undefined, unused_action)

    expect(state_out).toBeFalsy()
  })
})

describe('the reducers response to the start game action', () => {

  test('that the reducer passes the matches property to the matchOptionsToState function and uses it\'s response as the new state', () => {

    const action = {
      type: 'START_GAME_FROM_OPTIONS',
      options: EXAMPLE_OPTIONS
    }
    const spy = jest.spyOn(MatchOptionsToState, 'matchOptionsToState')
    const state_out = match(undefined, action)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(action.options.match)
    expect(spy).toHaveReturnedWith(state_out)
  })
})
