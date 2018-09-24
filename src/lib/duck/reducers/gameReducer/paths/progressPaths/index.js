// @flow

import type { Paths } from '../types'
import type { Players } from '~/common/flow-types'
import { getRelevantPlayerByPath } from '../getRelevantPlayerByPath'
import { progressPathInDirection } from './progressPathInDirection'

export const progressPaths = (players: Players, paths: Paths): Paths => {

  const paths_out = { ...paths }

  paths_out.allIds.forEach(path_id => {
    // TODO; need to handle the thrown error from getRelevantPlayerDirection
    // so that direction is known to be defined
    // $FlowFixMe
    const { direction } = getRelevantPlayerByPath(players, path_id)
    const path = progressPathInDirection(paths.byId[path_id].path, direction)
    paths_out.byId[path_id] = {
      id: path_id,
      path
    }
  })

  return paths_out
}

