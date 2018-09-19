// @flow

import type { Coord, Path } from '../../types'

export const coordsToInitialPath = (coord: Coord): Path => {

  const path = [ coord, coord ]

  return path
}
