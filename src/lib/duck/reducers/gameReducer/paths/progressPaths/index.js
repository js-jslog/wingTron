// @flow

import type { Paths } from '../types'
import type { Players } from '~/common/flow-types'
import { getRelevantPlayerDirection } from './getRelevantPlayerDirection'
import { progressPathInDirection } from './progressPathInDirection'

export const progressPaths = (players: Players, paths: Paths): Paths => {

  const paths_out = { ...paths }

  paths_out.allIds.forEach(path_id => {
    const direction = getRelevantPlayerDirection(players, path_id)
    // TODO; need to handle the thrown error from getRelevantPlayerDirection
    // so that direction is known to be defined
    // $FlowFixMe
    const path = progressPathInDirection(paths.byId[path_id].path, direction)
    paths_out.byId[path_id] = {
      id: path_id,
      path
    }
  })

  return paths_out
}

