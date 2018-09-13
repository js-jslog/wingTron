// @flow

import type { MatchOptions, GameMatch } from '~/common/flow-types'

export const matchOptionsToState = (options: MatchOptions): GameMatch => {
  const gameMatch = {
    field_width: parseInt(options.field_width),
    field_height: parseInt(options.field_height),
    matches: parseInt(options.matches)
  }

  return gameMatch
}
