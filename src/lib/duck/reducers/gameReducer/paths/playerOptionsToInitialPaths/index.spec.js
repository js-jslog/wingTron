// @flow

import { playerOptionsToInitialPaths } from './'
import { EXAMPLE_PATHS } from '../constants'
import { EXAMPLE_OPTIONS } from '~/common/constants'
import * as CoordsToInitialPath from './coordsToInitialPath'
import * as PathArrayToPaths from './pathArrayToPaths'

describe('the paths reducer', () => {

  const options = EXAMPLE_OPTIONS
  const p0 = options.players[0]
  const p1 = options.players[1]
  let coordsToInitialPathSpy
  let pathArrayToPathsSpy

  beforeEach(() => {
    coordsToInitialPathSpy = jest.spyOn(CoordsToInitialPath, 'coordsToInitialPath')
    pathArrayToPathsSpy = jest.spyOn(PathArrayToPaths, 'pathArrayToPaths')
    playerOptionsToInitialPaths(options.players)
  })

  it('should use it\'s two support functions', () => {

    expect(coordsToInitialPathSpy).toBeCalledTimes(2)
    expect(pathArrayToPathsSpy).toBeCalledTimes(1)
  })

  it('should convert the coords to ints before passing them on to the coordsToInitialPath function', () => {
    const p0_x_int = parseInt(p0.start_coord_x)
    const p0_y_int = parseInt(p0.start_coord_y)
    const p1_x_int = parseInt(p1.start_coord_x)
    const p1_y_int = parseInt(p1.start_coord_y)

    expect(coordsToInitialPathSpy).toBeCalledWith([ p0_x_int, p0_y_int ])
    expect(coordsToInitialPathSpy).toBeCalledWith([ p1_x_int, p1_y_int ])
  })
})
