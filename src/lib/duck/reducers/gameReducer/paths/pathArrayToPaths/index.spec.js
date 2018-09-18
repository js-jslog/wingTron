// @flow

import { EXAMPLE_PATHS } from '../constants'
import { pathArrayToPaths } from './'

describe('the conversion of an array of Path objects to a proper Paths object', () => {

  it('should take a single enty array and create a Paths object', () => {

    const input = [
      EXAMPLE_PATHS.byId['0'].path,
      EXAMPLE_PATHS.byId['1'].path
    ]
    const expected_output = EXAMPLE_PATHS

    const output = pathArrayToPaths(input)

    expect(output).toEqual(expected_output)
  })
})

