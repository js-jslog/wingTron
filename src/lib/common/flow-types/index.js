// @flow

import type { OptionsReducer } from '~/duck/reducers/optionsReducer'
import type { GameMatch as GameMatchImport } from '~/duck/reducers/gameReducer/match/types'
import type { GamePlayer as GamePlayerImport } from '~/duck/reducers/gameReducer/players/types'
import type { GamePlayerSet as GamePlayerSetImport } from '~/duck/reducers/gameReducer/players/types'
import type { Options as OptionsImport } from '~/duck/reducers/optionsReducer'

export type { UpdateOptionsAction } from '~/duck/actions/types'
export type { AddPlayerToOptionsAction } from '~/duck/actions/types'
export type { RemovePlayerFromOptionsAction } from '~/duck/actions/types'
export type { StartGameFromOptionsAction } from '~/duck/actions/types'
export type { Action } from '~/duck/actions/types'

export type { PlayerOptions } from '~/duck/reducers/optionsReducer/playerOptionsReducer/types'
export type { MatchOptions } from '~/duck/reducers/optionsReducer/matchOptionsReducer/types'
export type GameMatch = GameMatchImport
export type GamePlayer = GamePlayerImport
export type GamePlayerSet = GamePlayerSetImport
export type Options = OptionsImport

export type State = {|
  game: ?Game,
  options: Options
|}

export type Game = {|
  match: ?GameMatch,
  players: ?GamePlayerSet
|}




