// @flow

import type { Coord } from '../types'
import type { Path } from '../types'
import type { NamedPath } from '../types'
import type { PathsById } from '../types'
import type { PathList } from '../types'
import type { Paths } from '../types'

const EXAMPLE_COORD: Coord = [ 150, 100 ]
const EXAMPLE_PATH: Path = [
  EXAMPLE_COORD,
  EXAMPLE_COORD
]
const EXAMPLE_NAMED_PATH0: NamedPath = {
  id: '0',
  path: EXAMPLE_PATH
}
const EXAMPLE_NAMED_PATH1: NamedPath = {
  id: '1',
  path: EXAMPLE_PATH
}
const EXAMPLE_PATHS_BY_ID: PathsById = {
  '0': EXAMPLE_NAMED_PATH0,
  '1': EXAMPLE_NAMED_PATH1
}
const EXAMPLE_PATH_LIST: PathList = [ '0', '1' ]
export const EXAMPLE_PATHS = {
  byId: EXAMPLE_PATHS_BY_ID,
  allIds: EXAMPLE_PATH_LIST
}
