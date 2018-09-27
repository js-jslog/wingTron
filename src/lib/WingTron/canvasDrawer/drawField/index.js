// @flow

import type { Match } from '~/common/flow-types'

export const drawField = (ctx: CanvasRenderingContext2D, match: Match) => {

  const { field_width } = match
  const { field_height } = match

  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  ctx.fillRect(0, 0, field_width, field_height);
}

