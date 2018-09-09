import * as ActionTypes from '~/duck/types/'
import { INITIAL_STATE } from './constants'

export const playerOptionsReducer = (state_in=INITIAL_STATE, action) => {
  switch(action.type) {

    case ActionTypes.UPDATE_OPTIONS: {

      return [ ...action.options ]
    }

    case ActionTypes.ADD_PLAYER_TO_OPTIONS: {

        return [ ...state_in, {} ]
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

