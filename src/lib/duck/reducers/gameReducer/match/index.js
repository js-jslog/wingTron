import * as ActionTypes from '~/duck/types/'
import { matchOptionsToState } from './matchOptionsToState'

export const match = (state_in, action) => {

  switch(action.type) {

    case ActionTypes.START_GAME_FROM_OPTIONS: {

      return matchOptionsToState(action.options)
    }

    default: return state_in
  }
}
