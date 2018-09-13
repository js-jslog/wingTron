// @flow

import type { GamePlayer, PlayerOptions } from '~/common/flow-types/'

export const optionsConverter = (playerOptions: PlayerOptions): GamePlayer => {

  const gamePlayer = {
    start_coord_x: parseInt(playerOptions.start_coord_x),
    start_coord_y: parseInt(playerOptions.start_coord_y),
    direction: parseFloat(playerOptions.direction),
    turn_left_keycode: parseInt(playerOptions.turn_left_keycode),
    turn_right_keycode: parseInt(playerOptions.turn_right_keycode),
    colour: playerOptions.colour
  }

  return gamePlayer
}
