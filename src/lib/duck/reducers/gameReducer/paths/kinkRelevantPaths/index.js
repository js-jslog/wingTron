// @flow

import type { Paths } from '../types'
import type { Players } from '~/common/flow-types'
import { getRelevantPlayerByPath } from '../getRelevantPlayerByPath'
import { kinkPath } from './kinkPath'

export const kinkRelevantPaths = (event: any, players: Players, paths_in: Paths): Paths => {

  if (!event || event.type !== 'keydown' || !event.keyCode) {
    return paths_in
  }

  const paths_to_kink = paths_in.allIds.filter(path_id => {
    // TODO; need to handle the thrown error from getRelevantPlayerDirection
    // so that player is known to be defined
    const player = getRelevantPlayerByPath(players, path_id)
    // $FlowFixMe
    const { turn_left_keycode } = player
    // $FlowFixMe
    const { turn_right_keycode } = player

    return (event.keyCode === turn_left_keycode || event.keyCode === turn_right_keycode)
  })

  if (paths_to_kink.length === 0) {
    return paths_in
  }

  const paths_out = { ...paths_in }
  paths_out.byId = { ...paths_in.byId }

  paths_to_kink.forEach(path_id => {
    const path = kinkPath(paths_out.byId[path_id].path)

    paths_out.byId[path_id] = {
      id: path_id,
      path
    }
  })

  return paths_out
}

