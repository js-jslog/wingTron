import * as ActionTypes from '~/duck/types/'

const INITIAL_STATE = {
  field_width: '200',
  field_height: '200',
  matches: '10',
  players: [
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
    },
  ]
}

export const optionsReducer = (state_in=INITIAL_STATE, action) => {
  switch(action.type) {

    case ActionTypes.UPDATE_OPTIONS: {

      return { ...action.options }
    }

    default: return state_in
  }
}
