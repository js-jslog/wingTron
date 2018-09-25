// @flow

import type { Paths } from '../types'
import type { Players } from '~/common/flow-types'
import { getRelevantPlayerByPath } from '../getRelevantPlayerByPath'
import { kinkPath } from './kinkPath'

export const kinkRelevantPaths = (event: any, players: Players, paths_in: Paths): Paths => {

  if (!event || event.type !== 'keydown' || !event.keyCode) {
    return paths_in
  }

  let match_found = false

  const paths_out = { ...paths_in }
  paths_out.byId = { ...paths_in.byId }

  paths_out.allIds.forEach(path_id => {
    // TODO; need to handle the thrown error from getRelevantPlayerDirection
    // so that player is known to be defined
    const player = getRelevantPlayerByPath(players, path_id)
    // $FlowFixMe
    const { turn_left_keycode } = player
    // $FlowFixMe
    const { turn_right_keycode } = player

    if (event.keyCode === turn_left_keycode || event.keyCode === turn_right_keycode) {
      match_found = true

      const path = kinkPath(paths_out.byId[path_id].path)
    
      paths_out.byId[path_id] = {
        id: path_id,
        path
      }
    }
  })

  if (!match_found) {
    return paths_in
  }

  return paths_out
}

