// @flow

import type { Options, MatchOptions, PlayerOptions } from '~/common/flow-types/'
import { matchOptionsReducer } from './matchOptionsReducer'
import { playerOptionsReducer } from './playerOptionsReducer'

export const optionsReducer = (state_in: ?Options, action: any) => ({
  match: matchOptionsReducer(state_in && state_in.match, action),
  players: playerOptionsReducer(state_in && state_in.players, action)
})
