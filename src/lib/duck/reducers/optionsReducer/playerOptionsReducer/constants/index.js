// @flow

import type { PlayerOptions } from '~/common/flow-types'
import { EXAMPLE_PLAYER1_OPTIONS, EXAMPLE_PLAYER2_OPTIONS } from '~/common/constants'

export const INITIAL_STATE: Array<PlayerOptions> = [
  { ...EXAMPLE_PLAYER1_OPTIONS },
  { ...EXAMPLE_PLAYER2_OPTIONS }
]
