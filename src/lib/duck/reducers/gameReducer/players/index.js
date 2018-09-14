// @flow

import type { GamePlayer } from '~/common/flow-types'
import type { Action } from '~/common/flow-types'
import { playerOptionsToState } from './playerOptionsToState'
import { EXAMPLE_PLAYER1_OPTIONS } from '~/common/constants'
import { EXAMPLE_PLAYER2_OPTIONS } from '~/common/constants'

export const players = (state_in: ?Array<GamePlayer>, action: Action): ?Array<GamePlayer> => {
  switch(action.type) {

    case 'START_GAME_FROM_OPTIONS': {

      // TODO: actually get the state
      const playerOptions = [
        EXAMPLE_PLAYER1_OPTIONS,
        EXAMPLE_PLAYER2_OPTIONS
      ]
      return playerOptionsToState(playerOptions)
    }

    default: return state_in
  }
}
