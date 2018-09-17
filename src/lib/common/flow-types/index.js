// @flow

import type { OptionsReducer } from '~/duck/reducers/optionsReducer'
import type { Options as OptionsImport } from '~/duck/reducers/optionsReducer'

import type { GameMatch as GameMatchImport } from '~/duck/reducers/gameReducer/match/types'

import type { Player as PlayerImport } from '~/duck/reducers/gameReducer/players/types'
import type { PlayersById as PlayersByIdImport } from '~/duck/reducers/gameReducer/players/types'
import type { PlayerList as PlayerListImport } from '~/duck/reducers/gameReducer/players/types'
import type { Players as PlayersImport } from '~/duck/reducers/gameReducer/players/types'

import type { Paths } from '~/duck/reducers/gameReducer/paths/types'

export type { UpdateOptionsAction } from '~/duck/actions/types'
export type { AddPlayerToOptionsAction } from '~/duck/actions/types'
export type { RemovePlayerFromOptionsAction } from '~/duck/actions/types'
export type { StartGameFromOptionsAction } from '~/duck/actions/types'
export type { Action } from '~/duck/actions/types'

export type { PlayerOptions } from '~/duck/reducers/optionsReducer/playerOptionsReducer/types'
export type { MatchOptions } from '~/duck/reducers/optionsReducer/matchOptionsReducer/types'
export type Options = OptionsImport

export type GameMatch = GameMatchImport

export type Player = PlayerImport
export type PlayersById = PlayersByIdImport
export type PlayerList = PlayerListImport
export type Players = PlayersImport

export type State = {|
  game: ?Game,
  options: Options
|}

export type Game = {|
  match: ?GameMatch,
  players: ?Players,
  paths: ?Paths
|}




