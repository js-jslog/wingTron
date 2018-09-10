// @flow

import type { GamePlayer, PlayerOptions } from '~/common/flow-types'
import { optionsConverter } from './optionsConverter'

export const playerOptionsToState = (player_options: Array<PlayerOptions>): Array<GamePlayer> => {

  const state = player_options.map(optionsConverter)

  return state
}
