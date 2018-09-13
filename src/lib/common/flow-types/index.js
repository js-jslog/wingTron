// @flow

import type { OptionsReducer } from '~/duck/reducers/optionsReducer'
import type { GameMatch as GameMatchImport } from '~/duck/reducers/gameReducer/match/types'
import type { GamePlayer as GamePlayerImport } from '~/duck/reducers/gameReducer/players/types'
import type { GamePlayerSet as GamePlayerSetImport } from '~/duck/reducers/gameReducer/players/types'

export type { PlayerOptions } from '~/duck/reducers/optionsReducer/playerOptionsReducer/types'
export type { MatchOptions } from '~/duck/reducers/optionsReducer/matchOptionsReducer/types'
export type GameMatch = GameMatchImport
export type GamePlayer = GamePlayerImport
export type GamePlayerSet = GamePlayerSetImport

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V
export type Options = $ObjMap<OptionsReducer, $ExtractFunctionReturn>

export type State = {|
  game: ?Game,
  options: Options
|}

export type Game = {|
  match: ?GameMatch,
  players: ?GamePlayerSet
|}
