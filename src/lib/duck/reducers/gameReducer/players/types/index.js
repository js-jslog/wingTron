// @flow

// TODO: replace the coord properties with path properties
export type GamePlayer = {|
  start_coord_x: number,
  start_coord_y: number,
  direction: number,
  turn_left_keycode: number,
  turn_right_keycode: number,
  colour: string
|}

export type GamePlayerSet = Array<GamePlayer>
