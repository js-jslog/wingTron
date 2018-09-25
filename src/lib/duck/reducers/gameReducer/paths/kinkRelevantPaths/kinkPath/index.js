// @flow

import type { Path } from '../../types'

export const kinkPath = (path: Path): Path => {
  const current_coord = [ ...path[0] ]
  const path_out = [
    current_coord,
    ...path
  ]

  return path_out
}
