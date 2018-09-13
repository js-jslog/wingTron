// @flow

import type { GamePlayer } from '~/common/flow-types'
import * as ActionTypes from '~/duck/types/'
import { playerOptionsToState } from './playerOptionsToState'

export const players = (state_in: ?Array<GamePlayer>, action: any): ?Array<GamePlayer> => {
  switch(action.type) {

    case ActionTypes.START_GAME_FROM_OPTIONS: {

      return playerOptionsToState(action.options.players)
    }

    default: return state_in
  }
}
