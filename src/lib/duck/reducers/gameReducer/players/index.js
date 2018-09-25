// @flow

import type { Players } from './types'
import type { Action } from '~/common/flow-types'
import { playerOptionsToState } from './playerOptionsToState'
import { handleTurnKeys } from './handleTurnKeys'

export const players = (state_in: Players|null=null, action: Action): Players|null => {
  switch(action.type) {

    case 'START_GAME_FROM_OPTIONS': {

      const { players } = action.options
      return playerOptionsToState(players)
    }

    case 'HANDLE_KEY_EVENT': {

      if (state_in === null) throw new Error

      const { event } = action
      return handleTurnKeys(event, state_in)
    }

    default: return state_in
  }
}
