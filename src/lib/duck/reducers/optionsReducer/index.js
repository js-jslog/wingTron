// @flow

import { combineReducers } from 'redux'
import { matchOptionsReducer } from './matchOptionsReducer'
import { playerOptionsReducer } from './playerOptionsReducer'

const reducerDefinition = {
  match: matchOptionsReducer,
  players: playerOptionsReducer
}

export type OptionsReducer = typeof reducerDefinition

export const optionsReducer = combineReducers(reducerDefinition)
