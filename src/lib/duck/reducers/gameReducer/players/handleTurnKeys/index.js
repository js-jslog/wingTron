// @flow

import type { Players } from '../types'
import { turnPlayer90 } from './turnPlayer90'

export const handleTurnKeys = (event: any, players_in: Players): Players => {

  if (!event || event.type !== 'keydown' || !event.keyCode) {
    return players_in
  }

  const turning_players = players_in.allIds.filter(player_id => {
    const player = players_in.byId[player_id]
    const { turn_left_keycode } = player
    const { turn_right_keycode } = player

    return (event.keyCode === turn_left_keycode || event.keyCode === turn_right_keycode)
  })

  if (turning_players.length === 0) return players_in

  const players_out = { ...players_in }
  players_out.byId = { ...players_in.byId }

  turning_players.forEach(player_id => {
    let player = players_out.byId[player_id]
    const { turn_left_keycode } = player

    if (event.keyCode === turn_left_keycode) {
      players_out.byId[player_id] = turnPlayer90('LEFT', player)
    } else {
      players_out.byId[player_id] = turnPlayer90('RIGHT', player)
    }
  })
    
  return players_out
}
