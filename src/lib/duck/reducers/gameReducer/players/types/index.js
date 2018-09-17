// @flow

export type Player = {|
  +id: string,
  +path: string,
  +direction: number,
  +turn_left_keycode: number,
  +turn_right_keycode: number,
  +colour: string
|}
export type PlayersById = { [string]: Player }
export type PlayerList = $ReadOnlyArray<string>
export type Players = {|
  +byId: PlayersById,
  +allIds: PlayerList
|}
