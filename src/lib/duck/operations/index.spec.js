import * as ActionCreators from '~/duck/actions/'
import * as ActionOperations from './'

describe('the pre-dispatch action operations', () => {

  test('that the updateOptions operation is identical to the updateOptions action creator', () => {

    expect(ActionOperations.updateOptions).toEqual(ActionCreators.updateOptions)
  })

  test('that the addPlayer operation is identical to the addPlayer action creator', () => {

    expect(ActionOperations.addPlayer).toEqual(ActionCreators.addPlayer)
  })

  test('that the removePlayer operation is identical to the removePlayer action creator', () => {

    expect(ActionOperations.removePlayer).toEqual(ActionCreators.removePlayer)
  })
})
