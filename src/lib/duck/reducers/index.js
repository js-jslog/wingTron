// @flow

import { combineReducers } from 'redux'
import { optionsReducer } from './optionsReducer'
import { gameReducer } from './gameReducer'
import { renderableGameReducer } from './renderableGameReducer'

const reducerDefinition = {
  options: optionsReducer,
  game: gameReducer,
  renderableGame: renderableGameReducer
}

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V
type RootReducer = typeof reducerDefinition

export type State = $ObjMap<RootReducer, $ExtractFunctionReturn>

export const rootReducer = combineReducers(reducerDefinition)
