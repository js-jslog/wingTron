// @flow

import { paths } from './'
import { EXAMPLE_PATHS } from './constants'
import { EXAMPLE_OPTIONS } from '~/common/constants'
import * as PlayerOptionsToInitialPaths from './playerOptionsToInitialPaths'

describe('the paths reducer', () => {

  it('should return the input state if no matching action types are found', () => {

    const state_in = EXAMPLE_PATHS
    const unrelated_action = { type: 'ADD_PLAYER_TO_OPTIONS' }
    const state_out = paths(state_in, unrelated_action)

    expect(state_out).toBe(state_in)
  })

  it('should define no initial state', () => {

    const unrelated_action = { type: 'ADD_PLAYER_TO_OPTIONS' }
    const state_out = paths(undefined, unrelated_action)

    expect(state_out).toBeFalsy()
  })

  it('should use the playerOptionsToInitialPaths function when the start game action is handled', () => {

    const options = EXAMPLE_OPTIONS
    const action = {
      type: 'START_GAME_FROM_OPTIONS',
      options: options
    }
    const playerOptionsToInitialPathsSpy = jest.spyOn(PlayerOptionsToInitialPaths, 'playerOptionsToInitialPaths')
    const state_out = paths(undefined, action)

    expect(playerOptionsToInitialPathsSpy).toBeCalledTimes(1)
    expect(playerOptionsToInitialPathsSpy).toBeCalledWith(EXAMPLE_OPTIONS.players)
  })
})
