// @flow

import type { Options as OptionsImport } from '~/duck/reducers/optionsReducer'
import type { Game as GameImport } from '~/duck/reducers/gameReducer'
export type Options = OptionsImport
export type Game = GameImport

export type { MatchOptions } from '~/duck/reducers/optionsReducer/matchOptionsReducer/types'
export type { PlayerOptions } from '~/duck/reducers/optionsReducer/playerOptionsReducer/types'
export type { PlayerOptionsSet } from '~/duck/reducers/optionsReducer/playerOptionsReducer/types'

export type { Match } from '~/duck/reducers/gameReducer/match/types'
export type { Paths } from '~/duck/reducers/gameReducer/paths/types'
export type { Player } from '~/duck/reducers/gameReducer/players/types'
export type { Players } from '~/duck/reducers/gameReducer/players/types'

export type { Action } from '~/duck/actions/types'

export type State = {|
  game: ?Game,
  options: Options
|}

