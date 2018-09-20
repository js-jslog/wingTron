// @flow

import type { Path } from '../../types'

export const progressPathInDirection = (path: Path, direction: number): Path => {

  const updating_coord = [ ...path[0] ]
  const path_out = [ ...path ]

  updating_coord[0] += Math.cos(direction);
  updating_coord[1] += Math.sin(direction);

  path_out[0] = updating_coord

  return path_out
}
