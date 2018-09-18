// @flow

import { combineReducers } from 'redux'
import { match } from './match'
import { players } from './players'
import { paths } from './paths'

const reducerDefinition = {
  match,
  players,
  paths
}

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V
type GameReducer = typeof reducerDefinition

export type Game = $ObjMap<GameReducer, $ExtractFunctionReturn>

export const gameReducer = combineReducers(reducerDefinition)
