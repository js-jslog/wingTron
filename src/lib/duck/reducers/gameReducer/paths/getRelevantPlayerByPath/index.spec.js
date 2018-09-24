// @flow

import { getRelevantPlayerByPath } from './'
import { EXAMPLE_PLAYERS } from '~/common/constants'

describe('the function to get player direction for a given path', () => {

  it('should return the correct player for a given path', () => {

    const players = EXAMPLE_PLAYERS
    const path_id = '0'

    const relevant_player = getRelevantPlayerByPath(players, path_id)

    expect(relevant_player).toBe(EXAMPLE_PLAYERS.byId['0'])
  })

  it('should throw an error if multiple players are associated to a path', () => {

    const players = { ...EXAMPLE_PLAYERS }
    players.byId = { ...EXAMPLE_PLAYERS.byId }
    players.byId['0'] = { ...EXAMPLE_PLAYERS.byId['0'] }
    // $FlowFixMe
    players.byId['0'].path = '1'

    const path_id = '1'

    expect(() => getRelevantPlayerByPath(players, path_id)).toThrow()
  })

  it('should throw an error if no players are associated to a path', () => {

    const players = { ...EXAMPLE_PLAYERS }
    players.byId = { ...EXAMPLE_PLAYERS.byId }
    players.byId['0'] = { ...EXAMPLE_PLAYERS.byId['0'] }
    // $FlowFixMe
    players.byId['0'].path = '1'

    const path_id = '0'

    expect(() => getRelevantPlayerByPath(players, path_id)).toThrow()
  })
})
