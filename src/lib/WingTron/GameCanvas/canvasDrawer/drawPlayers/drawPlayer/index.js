// @flow

import type { Coord } from '~/common/flow-types'

export type RenderablePlayer = {
  coord: Coord,
  colour: string
}

export const drawPlayer = (ctx: CanvasRenderingContext2D, renderable_player: RenderablePlayer) => {
  const player_size = 3
  const offset = (player_size -1) /2
  const colour = renderable_player.colour
  const coord = renderable_player.coord

  ctx.fillStyle = colour
  ctx.strokeStyle = colour
  ctx.fillRect(coord[0]-offset, coord[1]-offset, player_size, player_size)
}
