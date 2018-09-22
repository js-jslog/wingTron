// @flow

import type { Players } from '~/common/flow-types'
import type { Player } from '~/common/flow-types'

export const getRelevantPlayerDirection = (players: Players, path_id: string): ?number => {

  const matching_directions = players.allIds.map(
    (player_id) => returnPlayerDirectionIfPathMatches(players.byId[player_id], path_id)
  )
  const matching_directions_filtered = matching_directions.filter(val => (val !== null))

  if (matching_directions_filtered.length !== 1) throw new Error

  return matching_directions_filtered[0]
}
    
const returnPlayerDirectionIfPathMatches = (player: Player, path_id: string): number|null => {
  const return_val = ( player.path === path_id ? player.direction : null )

  return return_val
}
