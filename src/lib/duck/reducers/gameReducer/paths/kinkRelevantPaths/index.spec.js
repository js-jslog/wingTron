// @flow

import { EXAMPLE_PATHS } from '~/common/constants'
import { EXAMPLE_PLAYERS } from '~/common/constants'
import { kinkRelevantPaths } from './'
import * as KinkPath from './kinkPath'

describe('the logic to selectively produce kinks in the paths based on key events', () => {

  it('should return the state_in without modification if the event is not keydown', () => {

    const event = {
      type: 'keyup',
      keyCode: 37
    }
    const players = EXAMPLE_PLAYERS
    const paths_in = EXAMPLE_PATHS

    const paths_out = kinkRelevantPaths(event, players, paths_in)

    expect(paths_out).toBe(paths_in)
  })

  it('should call the kinkPaths function if there are players with matching turn keys', () => {

    const event = {
      type: 'keydown',
      keyCode: 37
    }
    const players = EXAMPLE_PLAYERS
    const paths_in = EXAMPLE_PATHS

    const kinkPathSpy = jest.spyOn(KinkPath, 'kinkPath')

    kinkRelevantPaths(event, players, paths_in)

    expect(kinkPathSpy).toHaveBeenCalledTimes(1)
  })

  it('should return a the state_in without modification if there are no matching turn keys', () => {

    const event = {
      type: 'keydown',
      keyCode: 999999999
    }
    const players = EXAMPLE_PLAYERS
    const paths_in = EXAMPLE_PATHS

    const paths_out = kinkRelevantPaths(event, players, paths_in)

    expect(paths_out).toBe(paths_in)
  })
})

