// @flow

import type { Paths } from './types'
import type { Action } from '~/common/flow-types'
import { coordsToInitialPath } from './coordsToInitialPath'
import { pathArrayToPaths } from './pathArrayToPaths'

const getCoords = (player_options) => ([
  player_options.start_coord_x,
  player_options.start_coord_y
])

export const paths = (state_in: ?Paths=null, action: Action): ?Paths => {
  switch(action.type) {

    case 'START_GAME_FROM_OPTIONS': {

      const { players } = action.options
      const path_array = players.map(player_options => coordsToInitialPath(getCoords(player_options)))
      const paths = pathArrayToPaths(path_array)

      return paths
    }

    default: return state_in
  }
}
