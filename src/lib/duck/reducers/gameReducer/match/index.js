// @flow

import type { GameMatch } from '~/common/flow-types'
import { matchOptionsToState } from './matchOptionsToState'

export const match = (state_in: ?GameMatch, action: any): ?GameMatch => {

  switch(action.type) {

    case 'START_GAME_FROM_OPTIONS': {

      return matchOptionsToState(action.options)
    }

    default: return state_in
  }
}
