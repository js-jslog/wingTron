// @flow

import type { Coord } from '../types'
import type { Path } from '../types'
import type { NamedPath } from '../types'
import type { PathsById } from '../types'
import type { PathList } from '../types'
import type { Paths } from '../types'

const EXAMPLE_COORD0: Coord = [ 151, 100 ]
const EXAMPLE_COORD1: Coord = [ 149, 100 ]
const EXAMPLE_PATH0: Path = [
  EXAMPLE_COORD0,
  EXAMPLE_COORD0
]
const EXAMPLE_PATH1: Path = [
  EXAMPLE_COORD1,
  EXAMPLE_COORD1
]
const EXAMPLE_NAMED_PATH0: NamedPath = {
  id: '0',
  path: EXAMPLE_PATH0
}
const EXAMPLE_NAMED_PATH1: NamedPath = {
  id: '1',
  path: EXAMPLE_PATH1
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
