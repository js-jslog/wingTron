// @flow

import type { Game } from '~/common/flow-types'
import type { Action } from '~/common/flow-types'
import { match } from './match'
import { players } from './players'
import { paths } from './paths'

export const gameReducer = (state_in: ?Game, action: Action): Game => ({
  match: match(state_in && state_in.match, action),
  players: players(state_in && state_in.players, action),
  paths: paths(state_in && state_in.paths, action)
})
