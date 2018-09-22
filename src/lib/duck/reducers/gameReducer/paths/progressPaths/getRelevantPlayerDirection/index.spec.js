// @flow

import { getRelevantPlayerDirection } from './'
import { EXAMPLE_PLAYERS } from '~/common/constants'

describe('the function to get player direction for a given path', () => {

  it('should return the correct player direction for a given path', () => {

    const players = EXAMPLE_PLAYERS
    const path_id = '0'

    const relevant_direction = getRelevantPlayerDirection(players, path_id)

    expect(relevant_direction).toBe(0)
  })

  it('should throw an error if multiple players are associated to a path', () => {

    const players = { ...EXAMPLE_PLAYERS }
    const path_id = '1'
    // $FlowFixMe
    players.byId['0'].path = '1'

    expect(() => getRelevantPlayerDirection(players, path_id)).toThrow()
  })

  it('should throw an error if no players are associated to a path', () => {

    const players = { ...EXAMPLE_PLAYERS }
    const path_id = '0'
    // $FlowFixMe
    players.byId['0'].path = '1'

    expect(() => getRelevantPlayerDirection(players, path_id)).toThrow()
  })
})
