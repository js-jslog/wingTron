import * as ActionTypes from '~/duck/types/'

const INITIAL_STATE = [
    {
      start_coord_x: '150',
      start_coord_y: '100',
      direction: '0',
      turn_left_keycode: '37',
      turn_right_keycode: '39',
      colour: 'rgba(255,0,0, 0.5)',
    },
    {
      start_coord_x: '150',
      start_coord_y: '100',
      direction: '' + Math.PI,
      turn_left_keycode: '65',
      turn_right_keycode: '68',
      colour: 'rgba(0,0,255, 0.5)',
    }
]

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

