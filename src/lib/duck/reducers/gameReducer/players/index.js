// @flow

import type { Players } from './types'
import type { Action } from '~/common/flow-types'
import { playerOptionsToState } from './playerOptionsToState'
import { EXAMPLE_PLAYER1_OPTIONS } from '~/common/constants'
import { EXAMPLE_PLAYER2_OPTIONS } from '~/common/constants'

export const players = (state_in: ?Players, action: Action): ?Players => {
  switch(action.type) {

    case 'START_GAME_FROM_OPTIONS': {

      const { players } = action.options
      return playerOptionsToState(players)
    }

    default: return state_in
  }
}
