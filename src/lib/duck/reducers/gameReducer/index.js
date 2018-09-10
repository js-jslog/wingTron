// @flow

import type { Game, GameMatch, GamePlayer } from '~/common/flow-types'
import { match } from './match'
import { players } from './players'

export const gameReducer = (state_in: ?Game, action: any): Game => ({
  match: match(state_in && state_in.match, action),
  players: players(state_in && state_in.players, action)
})
