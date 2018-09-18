// @flow

import * as ActionCreators from '../'
import type { UpdateOptionsAction } from '../types'
import type { AddPlayerToOptionsAction } from '../types'
import type { RemovePlayerFromOptionsAction } from '../types'
import type { StartGameFromOptionsAction } from '../types'
import { EXAMPLE_OPTIONS } from '~/common/constants'

describe('the action creators', () => {

  test('that the update options action contains the parameterised options', () => {

    const options = EXAMPLE_OPTIONS
    const actual: UpdateOptionsAction = ActionCreators.updateOptions(options)

    expect(actual.options).toEqual(options)
  })

  test('that an add player to options action can be created', () => {

    const actual: AddPlayerToOptionsAction = ActionCreators.addPlayerToOptions()

    expect(actual).toBeTruthy()
  })

  test('that the removal index parameter is passed in to the created action', () => {

    const removal_index = 1
    const actual: RemovePlayerFromOptionsAction = ActionCreators.removePlayerFromOptions(removal_index)

    expect(actual.index).toEqual(removal_index)
  })

  test('that start game action contains the parameterised options', () => {

    const options = EXAMPLE_OPTIONS
    const actual: StartGameFromOptionsAction = ActionCreators.startGameFromOptions(options)

    expect(actual.options).toEqual(options)
  })
})

