// @flow

import type { MatchOptions, PlayerOptions, GameMatch, GamePlayer } from '~/common/flow-types'

export const EXAMPLE_MATCH_OPTIONS: MatchOptions = {
  field_width: '200',
  field_height: '200',
  matches: '10'
}

export const EXAMPLE_PLAYER1_OPTIONS: PlayerOptions = {
  start_coord_x: '150',
  start_coord_y: '100',
  direction: '0',
  turn_left_keycode: '37',
  turn_right_keycode: '39',
  colour: 'rgba(255,0,0, 0.5)',
}

export const EXAMPLE_PLAYER2_OPTIONS: PlayerOptions = {
  start_coord_x: '150',
  start_coord_y: '100',
  direction: '' + Math.PI,
  turn_left_keycode: '65',
  turn_right_keycode: '68',
  colour: 'rgba(0,0,255, 0.5)',
}

export const EXAMPLE_GAME_MATCH: GameMatch = {
  field_width: 200,
  field_height: 200,
  matches: 10
}

export const EXAMPLE_GAME_PLAYER1: GamePlayer = {
  start_coord_x: 150,
  start_coord_y: 100,
  direction: 0,
  turn_left_keycode: 37,
  turn_right_keycode: 39,
  colour: 'rgba(255,0,0, 0.5)',
}

export const EXAMPLE_GAME_PLAYER2: GamePlayer = {
  start_coord_x: 150,
  start_coord_y: 100,
  direction: Math.PI,
  turn_left_keycode: 65,
  turn_right_keycode: 68,
  colour: 'rgba(0,0,255, 0.5)',
}

