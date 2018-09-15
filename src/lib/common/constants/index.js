// @flow

import type { GameMatch, GamePlayer } from '~/common/flow-types'

import { INITIAL_STATE as EXAMPLE_MATCH_OPTIONS_IMPORT } from '~/duck/reducers/optionsReducer/matchOptionsReducer/constants'
import { INITIAL_PLAYER1_OPTIONS as EXAMPLE_PLAYER1_OPTIONS_IMPORT } from '~/duck/reducers/optionsReducer/playerOptionsReducer/constants'
import { INITIAL_PLAYER2_OPTIONS as EXAMPLE_PLAYER2_OPTIONS_IMPORT } from '~/duck/reducers/optionsReducer/playerOptionsReducer/constants'

export const EXAMPLE_MATCH_OPTIONS = EXAMPLE_MATCH_OPTIONS_IMPORT
export const EXAMPLE_PLAYER1_OPTIONS = EXAMPLE_PLAYER1_OPTIONS_IMPORT
export const EXAMPLE_PLAYER2_OPTIONS = EXAMPLE_PLAYER2_OPTIONS_IMPORT

export const EXAMPLE_OPTIONS = {
  match: { ...EXAMPLE_MATCH_OPTIONS },
  players: [
    { ...EXAMPLE_PLAYER1_OPTIONS },
    { ...EXAMPLE_PLAYER2_OPTIONS }
  ]
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

export const EXAMPLE_GAME = {
  match: { ...EXAMPLE_GAME_MATCH },
  players: [
    { ...EXAMPLE_GAME_PLAYER1 },
    { ...EXAMPLE_GAME_PLAYER2 }
  ]
}

