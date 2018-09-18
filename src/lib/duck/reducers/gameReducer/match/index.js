// @flow

import type { Match } from '~/common/flow-types'
import type { Action } from '~/common/flow-types'
import { matchOptionsToState } from './matchOptionsToState'

export const match = (state_in: ?Match, action: Action): ?Match => {

  switch(action.type) {

    case 'START_GAME_FROM_OPTIONS': {

      return matchOptionsToState(action.options.match)
    }

    default: return state_in
  }
}
