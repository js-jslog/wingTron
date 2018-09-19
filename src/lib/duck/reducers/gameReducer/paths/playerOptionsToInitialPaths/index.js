// @flow

import { coordsToInitialPath } from './coordsToInitialPath'
import { pathArrayToPaths } from './pathArrayToPaths'
import type { PlayerOptionsSet, PlayerOptions } from '~/common/flow-types'
import type { Paths, Coord } from '../types'

const getCoords = (player_options: PlayerOptions): Coord => ([
  parseInt(player_options.start_coord_x),
  parseInt(player_options.start_coord_y)
])

export const playerOptionsToInitialPaths = (players_options: PlayerOptionsSet): Paths => {
  const path_array = players_options.map(
    player_options => coordsToInitialPath(getCoords(player_options))
  )
  const paths = pathArrayToPaths(path_array)

  return paths
}
