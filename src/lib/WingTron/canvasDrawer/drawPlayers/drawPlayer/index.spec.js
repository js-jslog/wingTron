// @flow

import { EXAMPLE_PLAYERS } from '~/common/constants'
import { EXAMPLE_PATHS } from '~/common/constants'
import { precipitateRenderablePlayer } from './precipitateRenderablePlayer'
import { drawPlayer } from './'

describe('the drawing of a player on canvas context', () => {

  it('should call `fillRect` on the context with the appropriate player properties', () => {

    const player = EXAMPLE_PLAYERS.byId['0']
    const paths = EXAMPLE_PATHS
    const renderable_player = precipitateRenderablePlayer(player, paths)
      
    const ctx = window.document.createElement('canvas').getContext('2d')

    drawPlayer(ctx, renderable_player)

    expect(ctx.fillRect).toHaveBeenCalled()
    expect(ctx.fillStyle).toBe(renderable_player.colour)
    expect(ctx.strokeStyle).toBe(renderable_player.colour)
  })
})

