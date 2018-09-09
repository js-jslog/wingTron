import * as ActionTypes from '~/duck/types/'

const INITIAL_STATE = {
  field_width: '200',
  field_height: '200',
  matches: '10'
}

export const matchOptionsReducer = (state_in=INITIAL_STATE, action) => {
  switch(action.type) {

    case ActionTypes.UPDATE_OPTIONS: {

      return { ...action.options }
    }

    default: return state_in
  }
}

