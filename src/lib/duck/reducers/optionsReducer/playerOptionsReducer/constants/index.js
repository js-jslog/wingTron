// @flow

import type { PlayerOptions, PlayerOptionsSet} from '../types'

export const INITIAL_PLAYER1_OPTIONS: PlayerOptions = {
  start_coord_x: '150',
  start_coord_y: '100',
  direction: '0',
  turn_left_keycode: '37',
  turn_right_keycode: '39',
  colour: 'rgba(255,0,0, 0.5)',
}

export const INITIAL_PLAYER2_OPTIONS: PlayerOptions = {
  start_coord_x: '150',
  start_coord_y: '100',
  direction: '' + Math.PI,
  turn_left_keycode: '65',
  turn_right_keycode: '68',
  colour: 'rgba(0,0,255, 0.5)',
}

export const INITIAL_STATE: PlayerOptionsSet = [
  { ...INITIAL_PLAYER1_OPTIONS },
  { ...INITIAL_PLAYER2_OPTIONS }
]

