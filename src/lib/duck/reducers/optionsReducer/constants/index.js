// @flow

import type { Options } from '../'
import { INITIAL_STATE as EXAMPLE_MATCH_OPTIONS } from '../matchOptionsReducer/constants'
import { INITIAL_STATE as EXAMPLE_PLAYER_OPTIONS } from '../playerOptionsReducer/constants'

export const EXAMPLE_OPTIONS: Options = {
  match: EXAMPLE_MATCH_OPTIONS,
  players: EXAMPLE_PLAYER_OPTIONS
}
