// @flow

import { EXAMPLE_MATCH } from '~/common/constants'
import { EXAMPLE_PATHS } from '~/common/constants'
import { EXAMPLE_PLAYERS } from '~/common/constants'

import { renderableGameReducer } from './'
import { progressPlayerPaths } from '~/duck/actions'
import { setRenderableGame } from '~/duck/actions'

describe('the renderableGameReducer', () => {

  test('that the reducer returns the input state if no matching action types are found', () => {

    const state_in = {
      match: { ...EXAMPLE_MATCH },
      paths: { ...EXAMPLE_PATHS },
      players: { ...EXAMPLE_PLAYERS }
    }
    const dummy_players = { ...EXAMPLE_PLAYERS }
    const irrelevant_action = progressPlayerPaths(dummy_players)
    const state_out = renderableGameReducer(state_in, irrelevant_action)

    expect(state_out).toEqual(state_in)
    // $FlowFixMe
    expect(state_out.match).toBe(state_in.match)
    // $FlowFixMe
    expect(state_out.players).toBe(state_in.players)
  })

  test('that the reducer defines no initial state', () => {

    const dummy_players = { ...EXAMPLE_PLAYERS }
    const irrelevant_action = progressPlayerPaths(dummy_players)

    const expected_state = null
    const state_out = renderableGameReducer(undefined, irrelevant_action)

    expect(state_out).toEqual(expected_state)
  })

  test('that the reducer sets the state to the input game state for the appropriate action', () => {

    const game_state = {
      match: { ...EXAMPLE_MATCH },
      paths: { ...EXAMPLE_PATHS },
      players: { ...EXAMPLE_PLAYERS }
    }

    const state_out = renderableGameReducer(undefined, setRenderableGame(game_state))
    expect(state_out).toEqual(game_state)
  })
})
