// @flow

import { EXAMPLE_PATHS } from '../../constants'
import { kinkPath } from './'

it('should add a kink to a path', () => {

  const path_in = [ ...EXAMPLE_PATHS.byId['0'].path ]

  const path_out = kinkPath(path_in)

  expect(path_out.length).toBe(path_in.length + 1)
})

test.only('that the kink point has the same coord either side and for the rest of the path to be unmodified', () => {

  const path_in = [ ...EXAMPLE_PATHS.byId['0'].path ]
  path_in.unshift([ 250, 999 ])

  const path_out = kinkPath(path_in)

  expect(path_out[0]).toEqual(path_in[0])
  expect(path_out[0]).toEqual(path_out[1])

  const [ current_coord, ...historic_path ] = path_out

  expect(historic_path).toEqual(path_in)
})

