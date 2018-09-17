// @flow

import type { Player } from '../types'
import type { PlayersById } from '../types'
import type { PlayerList } from '../types'
import type { Players } from '../types'

const EXAMPLE_PLAYER0: Player = {
  id: '0',
  path: '0',
  direction: 0,
  turn_left_keycode: 37,
  turn_right_keycode: 39,
  colour: 'rgba(255,0,0, 0.5)',
}

const EXAMPLE_PLAYER1: Player = {
  id: '1',
  path: '1',
  direction: Math.PI,
  turn_left_keycode: 65,
  turn_right_keycode: 68,
  colour: 'rgba(0,0,255, 0.5)',
}

const EXAMPLE_PLAYERS_BY_ID: PlayersById = {
  '0': EXAMPLE_PLAYER0,
  '1': EXAMPLE_PLAYER1
}
const EXAMPLE_PLAYER_LIST: PlayerList = [ '0', '1' ]

export const EXAMPLE_PLAYERS: Players = {
  byId: EXAMPLE_PLAYERS_BY_ID,
  allIds: EXAMPLE_PLAYER_LIST
}
