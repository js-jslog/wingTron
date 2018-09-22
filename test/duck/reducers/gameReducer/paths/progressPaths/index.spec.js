// @flow

import { EXAMPLE_PLAYERS } from '~/common/constants'
import { EXAMPLE_PATHS } from '~/common/constants'
import { progressPaths } from '~/duck/reducers/gameReducer/paths/progressPaths'

describe('the function to progress the Paths object in the state', () => {

  it('should progress some basic paths as it has done previously', () => {

    const players = EXAMPLE_PLAYERS
    const paths = EXAMPLE_PATHS

    const progressed_paths = progressPaths(players, paths)

    expect(progressed_paths).toMatchSnapshot()
  })
})
