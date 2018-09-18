// @flow

import type { Coord, Path } from '../types'

export const coordsToInitialPath = (string_coord: [string, string]): Path => {

  const coord = [
    parseInt(string_coord[0]),
    parseInt(string_coord[1])
  ]
  const path = [ coord, coord ]

  return path
}
