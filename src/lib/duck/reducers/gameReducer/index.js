import * as ActionTypes from '~/duck/types/'

const INITIAL_STATE = {
  game_state: 'NOT_RUNNING'
}

export const gameReducer = (state_in=INITIAL_STATE, action) => {
  switch(action.type) {

    case ActionTypes.START_GAME_FROM_OPTIONS: {

      return { ...action.options }
    }

    default: return state_in
  }
}
