// @flow

import type { MatchOptions } from '~/common/flow-types/'

const INITIAL_FIELD_WIDTH = '200'
const INITIAL_FIELD_HEIGHT = '200'
const INITIAL_MATCHES = '10'

export const INITIAL_STATE: MatchOptions = {
  field_width: INITIAL_FIELD_WIDTH,
  field_height: INITIAL_FIELD_HEIGHT,
  matches: INITIAL_MATCHES
}
