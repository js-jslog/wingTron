// @flow

import type { Game } from '~/common/flow-types'
import type { Action } from '~/common/flow-types'

export const renderableGameReducer = (state_in: Game|null=null, action: Action): Game|null => {
  switch(action.type) {

    case 'SET_RENDERABLE_GAME': {

      const renderableGame = { ...action.game }

      return renderableGame
    }

    default: return state_in
  }
}
