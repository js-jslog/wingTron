// @flow

import type { Path, Paths } from '../../types'

export const pathArrayToPaths = (path_array: $ReadOnlyArray<Path>): Paths => {

  const pathsById = {}
  const pathList = []

  path_array.forEach((path, index) => {
    const index_str = '' + index
    const named_path = {
      id: index_str,
      path: path
    }
    pathsById[index_str] = named_path
    pathList.push(index_str)
  })

  const paths = {
    byId: pathsById,
    allIds: pathList
  }

  return paths
}
