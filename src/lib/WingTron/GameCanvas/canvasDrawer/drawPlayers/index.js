// @flow

import type { Players } from '~/common/flow-types'
import type { Paths } from '~/common/flow-types'

import { precipitateRenderablePlayer } from './precipitateRenderablePlayer'
import { drawPlayer } from './drawPlayer'

export const drawPlayers = (ctx: CanvasRenderingContext2D, players: Players, paths: Paths) => {
  
  players.allIds.forEach(player_id => {
    const player = players.byId[player_id]
    const renderable_player = precipitateRenderablePlayer(player, paths)

    drawPlayer(ctx, renderable_player)
  })
}

