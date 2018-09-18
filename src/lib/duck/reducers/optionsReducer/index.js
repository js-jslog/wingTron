// @flow

import { combineReducers } from 'redux'
import { matchOptionsReducer } from './matchOptionsReducer'
import { playerOptionsReducer } from './playerOptionsReducer'

const reducerDefinition = {
  match: matchOptionsReducer,
  players: playerOptionsReducer
}

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V
type OptionsReducer = typeof reducerDefinition

export type Options = $ObjMap<OptionsReducer, $ExtractFunctionReturn>

export const optionsReducer = combineReducers(reducerDefinition)
