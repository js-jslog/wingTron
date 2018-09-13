import * as ActionTypes from '~/duck/types/'
import * as ActionCreators from '../'

describe('the action creators', () => {

  test('the updateOptions action creator', () => {

    // ADDING AN 'OPTIONS' FLOW TYPE TO THIS WILL RESULT IN AN ERROR
    // PROVING THAT THE METHOD OF DERIVING THE OPTIONS TYPE WORKS
    const options = {
      some: 'options',
      somemore: 'options',
    }
    const expected = {
      type: ActionTypes.UPDATE_OPTIONS,
      options: options,
    }
    const actual = ActionCreators.updateOptions(options)

    expect(actual).toEqual(expected)
  })

  test('the addPlayerToOptions action creator', () => {

    const expected = {
      type: ActionTypes.ADD_PLAYER_TO_OPTIONS,
    }
    const actual = ActionCreators.addPlayerToOptions()

    expect(actual).toEqual(expected)
  })

  test('the removePlayerFromOptions action creator', () => {

    const removal_index = 1
    const expected = {
      type: ActionTypes.REMOVE_PLAYER_FROM_OPTIONS,
      index: removal_index,
    }
    const actual = ActionCreators.removePlayerFromOptions(removal_index)

    expect(actual).toEqual(expected)
  })

})

