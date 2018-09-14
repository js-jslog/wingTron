// @flow

import type { MatchOptions } from './types'
import { INITIAL_STATE } from './constants'

export const matchOptionsReducer = (state_in: ?MatchOptions=INITIAL_STATE, action: any): MatchOptions => {

  // this will never actually modify state_in and is only here
  // because flow can't see the defaulting assignment above
  state_in = state_in || { ...INITIAL_STATE }

  switch(action.type) {

    case 'UPDATE_OPTIONS': {

      const { options } = action
      const state_out = {
        field_width: options.field_width,
        field_height: options.field_height,
        matches: options.matches
      }

      return state_out
    }

    default: return state_in
  }
}

