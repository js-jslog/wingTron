// @flow

import type { Player, PlayerOptions } from '~/common/flow-types/'

export const optionsConverter = (playerOptions: PlayerOptions, index: number): Player => {

  const player = {
    id: '' + index,
    path: '' + index,
    direction: parseFloat(playerOptions.direction),
    turn_left_keycode: parseInt(playerOptions.turn_left_keycode),
    turn_right_keycode: parseInt(playerOptions.turn_right_keycode),
    colour: playerOptions.colour
  }

  return player
}
