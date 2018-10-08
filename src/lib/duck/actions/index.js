// @flow

import type { Options } from '~/common/flow-types'
import type { Players } from '~/common/flow-types'
import type { Game } from '~/common/flow-types'
import type { UpdateOptionsAction } from './types'
import type { AddPlayerToOptionsAction } from './types'
import type { RemovePlayerFromOptionsAction } from './types'
import type { StartGameFromOptionsAction } from './types'
import type { ProgressPlayerPaths } from './types'
import type { SetRenderableGame } from './types'
import type { HandleKeyEvent } from './types'

export const updateOptions = (options: Options): UpdateOptionsAction => ({
  type: 'UPDATE_OPTIONS',
  options,
})

export const addPlayerToOptions = (): AddPlayerToOptionsAction => ({
  type: 'ADD_PLAYER_TO_OPTIONS',
})

export const removePlayerFromOptions = (index: number): RemovePlayerFromOptionsAction => ({
  type: 'REMOVE_PLAYER_FROM_OPTIONS',
  index
})

export const startGameFromOptions = (options: Options): StartGameFromOptionsAction => ({
  type: 'START_GAME_FROM_OPTIONS',
  options
})

export const progressPlayerPaths = (players: Players): ProgressPlayerPaths => ({
  type: 'PROGRESS_PLAYER_PATHS',
  players
})

export const setRenderableGame = (game: Game): SetRenderableGame => ({
  type: 'SET_RENDERABLE_GAME',
  game
})

export const handleKeyEvent = (event: any, players: Players): HandleKeyEvent => ({
  type: 'HANDLE_KEY_EVENT',
  event,
  players
})
