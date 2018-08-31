import * as ActionTypes from '~/duck/types/'

export const updateOptions = (options) => ({
  type: ActionTypes.UPDATE_OPTIONS,
  options: options,
})

export const addPlayerToOptions = () => ({
  type: ActionTypes.ADD_PLAYER_TO_OPTIONS,
})

export const removePlayerFromOptions = (index) => ({
  type: ActionTypes.REMOVE_PLAYER_FROM_OPTIONS,
  index: index,
})
