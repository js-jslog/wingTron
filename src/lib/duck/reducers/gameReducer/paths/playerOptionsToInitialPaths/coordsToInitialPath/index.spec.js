// @flow

import { EXAMPLE_OPTIONS } from '~/common/constants'
import { coordsToInitialPath } from './'

describe('the creation of a Paths object from initial coordinates', () => {

  it('should produce a Paths object', () => {

    const { start_coord_x } = EXAMPLE_OPTIONS.players[0]
    const { start_coord_y } = EXAMPLE_OPTIONS.players[0]
    const coord = [
      parseInt(start_coord_x),
      parseInt(start_coord_y)
    ]
    const expected_path = [ coord, coord ]

    const path = coordsToInitialPath(coord)

    expect(path).toEqual(expected_path)
  })
})
