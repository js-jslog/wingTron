// @flow

import type { Player } from '~/common/flow-types'
import type { Paths } from '~/common/flow-types'
import type { RenderablePlayer } from '../drawPlayer'

export const precipitateRenderablePlayer = (player: Player, paths: Paths): RenderablePlayer => {

  const current_coord = paths.byId[player.path].path[0]

  const renderable_player = {
    colour: player.colour,
    coord: current_coord
  }

  return renderable_player
}
