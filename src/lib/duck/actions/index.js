// @flow

import type { Options } from '~/common/flow-types'
import type { UpdateOptionsAction } from './types'
import type { AddPlayerToOptionsAction } from './types'
import type { RemovePlayerFromOptionsAction } from './types'
import type { StartGameFromOptionsAction } from './types'

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
