// @flow

import { INITIAL_STATE } from './constants'
import { INITIAL_PLAYER1_OPTIONS } from './constants'
import type { PlayerOptionsSet } from './types'
import type { Action } from '~/common/flow-types'

export const playerOptionsReducer = (state_in: ?PlayerOptionsSet=INITIAL_STATE, action: Action): PlayerOptionsSet => {

  // this will never actually modify state_in and is only here
  // because flow can't see the defaulting assignment above
  state_in = state_in || [ ...INITIAL_STATE ]

  switch(action.type) {

    case 'UPDATE_OPTIONS': {

      return [ ...action.options.players ]
    }

    case 'ADD_PLAYER_TO_OPTIONS': {

      const additional_player_options = { ...INITIAL_PLAYER1_OPTIONS }
      return [ ...state_in, additional_player_options ]
    }

    case 'REMOVE_PLAYER_FROM_OPTIONS': {
      const { index } = action
      const players = [ ...state_in ]

      players.splice(index, 1)

      return players
    }

    default: return state_in
  }
}

