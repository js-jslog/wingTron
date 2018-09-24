// @flow

import type { Players } from '~/common/flow-types'
import type { Player } from '~/common/flow-types'

export const getRelevantPlayerByPath = (players: Players, path_id: string): ?Player => {

  const matching_players = players.allIds.map(
    (player_id) => returnPlayerIfPathMatches(players.byId[player_id], path_id)
  )
  const matching_players_filtered = matching_players.filter(player => (player !== null))

  if (matching_players_filtered.length !== 1) throw new Error

  return matching_players_filtered[0]
}
    
const returnPlayerIfPathMatches = (player: Player, path_id: string): Player|null => (
  player.path === path_id ? player : null
)
