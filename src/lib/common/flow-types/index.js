// @flow

export type State = {|
  game: ?Game,
  options: Options
|}

export type Game = {|
  match: ?GameMatch,
  players: ?Array<GamePlayer>
|}

export type Options = {|
  match: MatchOptions,
  players: Array<PlayerOptions>
|}

export type GameMatch = {|
  field_width: number,
  field_height: number,
  matches: number
|}

export type GamePlayer = {|
  start_coord_x: number,
  start_coord_y: number,
  direction: number,
  turn_left_keycode: number,
  turn_right_keycode: number,
  colour: string
|}

export type MatchOptions = {|
  field_width: string,
  field_height: string,
  matches: string
|}

export type PlayerOptions = {|
  start_coord_x: string,
  start_coord_y: string,
  direction: string,
  turn_left_keycode: string,
  turn_right_keycode: string,
  colour: string
|}
