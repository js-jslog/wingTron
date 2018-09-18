// @flow

import type { Options as OptionsImport } from '~/duck/reducers/optionsReducer'

import type { Game as GameImport } from '~/duck/reducers/gameReducer'
import type { Match as MatchImport } from '~/duck/reducers/gameReducer/match/types'
import type { Players as PlayersImport } from '~/duck/reducers/gameReducer/players/types'
import type { Paths } from '~/duck/reducers/gameReducer/paths/types'

export type { MatchOptions } from '~/duck/reducers/optionsReducer/matchOptionsReducer/types'
export type { PlayerOptions } from '~/duck/reducers/optionsReducer/playerOptionsReducer/types'
export type { PlayerOptionsSet } from '~/duck/reducers/optionsReducer/playerOptionsReducer/types'
export type Options = OptionsImport

export type Game = GameImport
export type Match = MatchImport
export type { Player } from '~/duck/reducers/gameReducer/players/types'
export type Players = PlayersImport

export type { Action } from '~/duck/actions/types'

export type State = {|
  game: ?Game,
  options: Options
|}

