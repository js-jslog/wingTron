// @flow

export type PlayerOptions = {|
  +start_coord_x: string,
  +start_coord_y: string,
  +direction: string,
  +turn_left_keycode: string,
  +turn_right_keycode: string,
  +colour: string
|}

export type PlayerOptionsSet = Array<PlayerOptions>
