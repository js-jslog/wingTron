// @flow

import type { Players } from './types'
import type { Action } from '~/common/flow-types'
import { playerOptionsToState } from './playerOptionsToState'

export const players = (state_in: ?Players=null, action: Action): ?Players => {
  switch(action.type) {

    case 'START_GAME_FROM_OPTIONS': {

      const { players } = action.options
      return playerOptionsToState(players)
    }

    default: return state_in
  }
}
