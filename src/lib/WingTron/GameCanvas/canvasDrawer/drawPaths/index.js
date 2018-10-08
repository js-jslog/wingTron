// @flow

import type { Paths } from '~/common/flow-types'
import type { Players } from '~/common/flow-types'

import { precipitateRenderablePath } from './precipitateRenderablePath'
import { drawPath } from './drawPath'

export const drawPaths = (ctx: CanvasRenderingContext2D, paths: Paths, players: Players) => {

  paths.allIds.forEach(path_id => {

    const path = paths.byId[path_id]
    const renderable_path = precipitateRenderablePath(path, players)

    drawPath(ctx, renderable_path)
  })
}

