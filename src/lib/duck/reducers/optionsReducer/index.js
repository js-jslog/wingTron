// @flow

import { combineReducers } from 'redux'
import { matchOptionsReducer } from './matchOptionsReducer'
import { playerOptionsReducer } from './playerOptionsReducer'

const reducersDef = {
  match: matchOptionsReducer,
  players: playerOptionsReducer
}

export type OptionsReducer = typeof reducersDef

export const optionsReducer = combineReducers(reducersDef)
