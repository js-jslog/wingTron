import * as ActionTypes from '~/duck/types/'
import { INITIAL_STATE } from './constants'

export const matchOptionsReducer = (state_in=INITIAL_STATE, action) => {
  switch(action.type) {

    case ActionTypes.UPDATE_OPTIONS: {

      return { ...action.options }
    }

    default: return state_in
  }
}

