// @flow

import * as ActionTypes from '~/duck/types'
import type { Options } from '~/common/flow-types'
import type { UpdateOptionsAction } from './types'
import type { AddPlayerToOptionsAction } from './types'
import type { RemovePlayerFromOptionsAction } from './types'
import type { StartGameFromOptionsAction } from './types'

export const updateOptions = (options: Options): UpdateOptionsAction => ({
  type: ActionTypes.UPDATE_OPTIONS,
  options,
})

export const addPlayerToOptions = (): AddPlayerToOptionsAction => ({
  type: ActionTypes.ADD_PLAYER_TO_OPTIONS,
})

export const removePlayerFromOptions = (index: number): RemovePlayerFromOptionsAction => ({
  type: ActionTypes.REMOVE_PLAYER_FROM_OPTIONS,
  index
})
