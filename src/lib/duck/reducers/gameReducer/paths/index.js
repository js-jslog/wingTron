// @flow

import type { Paths } from './types'
import type { Action } from '~/common/flow-types'
import { playerOptionsToInitialPaths } from './playerOptionsToInitialPaths'
import { progressPaths } from './progressPaths'

export const paths = (state_in: Paths|null=null, action: Action): Paths|null => {
  switch(action.type) {

    case 'START_GAME_FROM_OPTIONS': {

      const { players } = action.options
      const paths = playerOptionsToInitialPaths(players)

      return paths
    }

    case 'PROGRESS_PLAYER_PATHS': {

      if (state_in === null) throw new Error

      const { players } = action
      const paths = progressPaths(players, state_in)

      return paths
    }

    default: return state_in
  }
}
