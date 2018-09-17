// @flow

import type { Paths } from './types'
import type { Action } from '~/common/flow-types'

export const paths = (state_in: ?Paths, action: Action): ?Paths => {
  switch(action.type) {

    default: return state_in
  }
}
