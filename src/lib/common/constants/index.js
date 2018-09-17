// @flow

import type { GameMatch, Player } from '~/common/flow-types'

import { INITIAL_STATE as EXAMPLE_MATCH_OPTIONS_IMPORT } from '~/duck/reducers/optionsReducer/matchOptionsReducer/constants'
import { INITIAL_PLAYER1_OPTIONS as EXAMPLE_PLAYER1_OPTIONS_IMPORT } from '~/duck/reducers/optionsReducer/playerOptionsReducer/constants'
import { INITIAL_PLAYER2_OPTIONS as EXAMPLE_PLAYER2_OPTIONS_IMPORT } from '~/duck/reducers/optionsReducer/playerOptionsReducer/constants'
import { EXAMPLE_PLAYERS as EXAMPLE_PLAYERS_IMPORT } from '~/duck/reducers/gameReducer/players/constants'

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

export const EXAMPLE_PLAYERS = EXAMPLE_PLAYERS_IMPORT

export const EXAMPLE_GAME = {
  match: { ...EXAMPLE_GAME_MATCH },
  players: EXAMPLE_PLAYERS
}

