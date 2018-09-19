// @flow

import type { Paths } from './types'
import type { Action } from '~/common/flow-types'
import { playerOptionsToInitialPaths } from './playerOptionsToInitialPaths'

export const paths = (state_in: ?Paths=null, action: Action): ?Paths => {
  switch(action.type) {

    case 'START_GAME_FROM_OPTIONS': {

      const { players } = action.options
      const paths = playerOptionsToInitialPaths(players)

      return paths
    }

    default: return state_in
  }
}
