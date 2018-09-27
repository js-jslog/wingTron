// @flow

import type { Path } from '~/common/flow-types'

export type RenderablePath = {
  path: Path,
  colour: string
}

export function drawPath(ctx: CanvasRenderingContext2D, renderable_path: RenderablePath) {
  const { path } = renderable_path
  const { colour } = renderable_path
  const path2d = new Path2D()

  path2d.moveTo(path[0][0], path[0][1])
  path.forEach(function (coord) {
    path2d.lineTo(coord[0], coord[1])
  });

  ctx.fillStyle = colour;
  ctx.strokeStyle = colour;
  ctx.fill(path2d);
}

