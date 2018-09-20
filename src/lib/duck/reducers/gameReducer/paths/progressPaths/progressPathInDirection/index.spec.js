// @flow

import { EXAMPLE_PATHS } from '~/common/constants'
import { progressPathInDirection } from './'

describe('the progression of a path in a given direction', () => {

  it('should not increase the length of the path', () => {

    const input_path = EXAMPLE_PATHS.byId['0'].path
    const direction = 0

    const updated_path = progressPathInDirection(input_path, direction)

    expect(updated_path.length).toEqual(input_path.length)
  })

  it('should modify the value of the most recent coord', () => {

    const input_path = EXAMPLE_PATHS.byId['0'].path
    const direction = 0

    const updated_path = progressPathInDirection(input_path, direction)

    expect(updated_path[0]).not.toEqual(input_path[0])
  })

  it('should leave all the other coords untouched', () => {

    const input_path = EXAMPLE_PATHS.byId['0'].path
    const direction = 0

    const updated_path = progressPathInDirection(input_path, direction)

    const input_path_minus_current = [ ...input_path ]
    input_path_minus_current.splice(0,1)
    const updated_path_minus_current = [ ...updated_path ]
    updated_path_minus_current.splice(0,1)

    expect(updated_path_minus_current).toEqual(input_path_minus_current)
  })

  test('that moving in the 1 direction should add a positive number less than 1 to both x & y coords', () => {

    const input_path = EXAMPLE_PATHS.byId['0'].path
    const direction = 1

    const updated_path = progressPathInDirection(input_path, direction)
    const x_diff = updated_path[0][0] - input_path[0][0]
    const y_diff = updated_path[0][1] - input_path[0][1]

    expect(x_diff).toBeGreaterThan(0)
    expect(x_diff).toBeLessThan(1)
    expect(y_diff).toBeGreaterThan(0)
    expect(y_diff).toBeLessThan(1)
  })
})
