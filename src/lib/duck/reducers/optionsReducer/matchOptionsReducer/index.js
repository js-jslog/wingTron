// @flow

import type { MatchOptions } from './types'
import type { Action } from '~/common/flow-types'
import { INITIAL_STATE } from './constants'

export const matchOptionsReducer = (state_in: ?MatchOptions=INITIAL_STATE, action: Action): MatchOptions => {

  // this will never actually modify state_in and is only here
  // because flow can't see the defaulting assignment above
  state_in = state_in || INITIAL_STATE

  switch(action.type) {

    case 'UPDATE_OPTIONS': {

      const { match } = action.options
      const state_out = {
        field_width: match.field_width,
        field_height: match.field_height,
        matches: match.matches
      }

      return state_out
    }

    default: return state_in
  }
}

