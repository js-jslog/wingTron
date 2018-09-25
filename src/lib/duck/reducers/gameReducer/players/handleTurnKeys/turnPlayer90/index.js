// @flow

import type { Player } from '../../types'

export const turnPlayer90 = (hand: 'LEFT'|'RIGHT', player_in: Player): Player => {

  const DEGREE90_IN_RADIANS = (Math.PI * 0.5)
  const player_out = { ...player_in }

  if (hand === 'LEFT') {
    player_out.direction -= DEGREE90_IN_RADIANS
  } else {
    player_out.direction += DEGREE90_IN_RADIANS
  }

  return player_out
}

