// @flow

import type { Players, PlayerOptions } from '~/common/flow-types'
import { optionsConverter } from './optionsConverter'

export const playerOptionsToState = (player_options: Array<PlayerOptions>): Players => {

  const playersById = {}
  const playerList = []
  player_options.forEach((player_option, index) => {
    playerList.push('' + index)
    playersById[index] = optionsConverter(player_option, index)
  })

  const players = {
    byId: playersById,
    allIds: playerList
  }

  return players
}
