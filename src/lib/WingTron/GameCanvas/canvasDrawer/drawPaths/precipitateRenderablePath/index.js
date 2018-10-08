// @flow

import type { Players } from '~/common/flow-types'
import type { NamedPath } from '~/common/flow-types'
import type { RenderablePath } from '../drawPath'

import { getRelevantPlayerByPath } from '~/common/functions'

export const precipitateRenderablePath = (path: NamedPath, players: Players): RenderablePath => {

  const relevant_player = getRelevantPlayerByPath(players, path.id)
  // $FlowFixMe
  const { colour } = relevant_player

  const renderable_path = {
    path: path.path,
    colour: colour
  }

  return renderable_path
}
