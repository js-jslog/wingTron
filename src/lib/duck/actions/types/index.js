// @flow

import type { Options } from '~/common/flow-types'
import type { Players } from '~/common/flow-types'

export type UpdateOptionsAction = {|
  +type: 'UPDATE_OPTIONS',
  +options: Options
|}

export type AddPlayerToOptionsAction = {|
  +type: 'ADD_PLAYER_TO_OPTIONS'
|}

export type RemovePlayerFromOptionsAction = {|
  +type: 'REMOVE_PLAYER_FROM_OPTIONS',
  +index: number
|}

export type StartGameFromOptionsAction = {|
  +type: 'START_GAME_FROM_OPTIONS',
  +options: Options
|}

export type ProgressPlayerPaths = {|
  +type: 'PROGRESS_PLAYER_PATHS',
  +players: Players
|}

export type Action =
  | UpdateOptionsAction
  | AddPlayerToOptionsAction
  | RemovePlayerFromOptionsAction
  | StartGameFromOptionsAction
  | ProgressPlayerPaths

