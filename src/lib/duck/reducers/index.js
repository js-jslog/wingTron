import * as ActionTypes from '~/duck/types/'

const INITIAL_STATE = {
  initial: 'state',
}

export const reducer = (state_in=INITIAL_STATE, action) => {
  switch(action.type) {

    case ActionTypes.UPDATE_OPTIONS: {

      return { ...action.options }
    }

    case ActionTypes.ADD_PLAYER_TO_OPTIONS: {
      const { players } = state_in

      return {
        ...state_in,
        players: [ ...players, {} ]
      }
    }

    case ActionTypes.REMOVE_PLAYER_FROM_OPTIONS: {
      const { index } = action
      const players = [ ...state_in.players ]

      players.splice(index, 1)

      return {
        ...state_in,
        players
      }
    }

    default: return state_in
  }
}
