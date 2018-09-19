// @flow

import type { PlayerOptions } from '~/common/flow-types'
import { optionsReducer } from './'

// TODO: review how to make the typing work with the combineReducer function
describe('the exceptional cases', () => {

  test('that the reducer returns a similar state object to it\'s parameter when no matching action type is found', () => {

    // TODO: I don't think this test is doing anything anymore
    const state_in = {
      match: 'something',
      players: 'something else'
    }
    const unknown_action = { type: 'UNDEFINED_ACTION_TYPE' }
    // TODO: this seems to be evidence that the typing of the return type of the
    // optionsReducer is not defined (PlayerOptions should produce an error)
    const state_out: PlayerOptions  = optionsReducer(state_in, unknown_action)

    expect(state_out).toEqual(state_in)
  })
})
