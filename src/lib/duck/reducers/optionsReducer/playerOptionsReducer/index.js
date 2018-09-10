// @flow

import type { PlayerOptions } from '~/common/flow-types/'
import * as ActionTypes from '~/duck/types/'
import { INITIAL_STATE } from './constants'

export const playerOptionsReducer = (state_in: ?Array<PlayerOptions>=INITIAL_STATE, action: any): Array<PlayerOptions> => {

  // this will never actually modify state_in and is only here
  // because flow can't see the defaulting assignment above
  state_in = state_in || [ ...INITIAL_STATE ]

  switch(action.type) {

    case ActionTypes.UPDATE_OPTIONS: {

      return [ ...action.options ]
    }

    case ActionTypes.ADD_PLAYER_TO_OPTIONS: {

      const additional_player_options = INITIAL_STATE[1]
      return [ ...state_in, additional_player_options ]
    }

    case ActionTypes.REMOVE_PLAYER_FROM_OPTIONS: {
      const { index } = action
      const players = [ ...state_in ]

      players.splice(index, 1)

      return players
    }

    default: return state_in
  }
}

