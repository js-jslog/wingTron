// @flow

import { paths } from './'
import { EXAMPLE_PATHS } from './constants'
import { EXAMPLE_OPTIONS } from '~/common/constants'
import * as CoordsToInitialPath from './coordsToInitialPath'
import * as PathArrayToPaths from './pathArrayToPaths'

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

  it('should use it\'s two support functions to produce a Paths object', () => {

    const options = EXAMPLE_OPTIONS
    const p0 = options.players[0]
    const p1 = options.players[1]
    const action = {
      type: 'START_GAME_FROM_OPTIONS',
      options: options
    }
    const coordsToInitialPathSpy = jest.spyOn(CoordsToInitialPath, 'coordsToInitialPath')
    const pathArrayToPathsSpy = jest.spyOn(PathArrayToPaths, 'pathArrayToPaths')
    const state_out = paths(undefined, action)

    expect(coordsToInitialPathSpy).toBeCalledTimes(2)
    expect(coordsToInitialPathSpy).toBeCalledWith([ p0.start_coord_x, p0.start_coord_y ])
    expect(coordsToInitialPathSpy).toBeCalledWith([ p1.start_coord_x, p1.start_coord_y ])

    expect(pathArrayToPathsSpy).toBeCalledTimes(1)
  })
})
