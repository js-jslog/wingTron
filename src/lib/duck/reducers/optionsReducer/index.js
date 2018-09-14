// @flow

import { combineReducers } from 'redux'
import { matchOptionsReducer } from './matchOptionsReducer'
import { playerOptionsReducer } from './playerOptionsReducer'

const reducerDefinition = {
  match: matchOptionsReducer,
  players: playerOptionsReducer
}

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V

export type Options = $ObjMap<OptionsReducer, $ExtractFunctionReturn>
export type OptionsReducer = typeof reducerDefinition

export const optionsReducer = combineReducers(reducerDefinition)
