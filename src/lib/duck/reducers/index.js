// @flow

import { combineReducers } from 'redux'
import { optionsReducer } from './optionsReducer'
import { gameReducer } from './gameReducer'

const reducerDefinition = {
  options: optionsReducer,
  game: gameReducer
}

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V
type RootReducer = typeof reducerDefinition

export type State = $ObjMap<RootReducer, $ExtractFunctionReturn>

export const rootReducer = combineReducers(reducerDefinition)
