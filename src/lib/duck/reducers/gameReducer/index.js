import { match } from './match'
import { players } from './players'

export const gameReducer = (state_in, action) => ({
  match: match(state_in && state_in.match, action),
  players: players(state_in && state_in.players, action)
})
