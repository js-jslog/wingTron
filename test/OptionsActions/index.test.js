import { updateOptionsAction, addPlayerAction, removePlayerAction } from '../../src/restructure/OptionsActions'
import OptionsStore from '../../src/restructure/OptionsStore.js'
import dispatcher from '../../src/lib/dispatcher.js'

beforeEach(() => {
  dispatcher.dispatch = jest.fn()
})

describe('the addPlayerAction action', () => {

  test('that a payload is dispatched to update the OptionsStore', () => {
    const options_with_add_player = JSON.parse(JSON.stringify(OptionsStore.DEFAULT_OPTIONS))
    const new_player = JSON.parse(JSON.stringify(OptionsStore.DEFAULT_OPTIONS.player_options[0]))
    options_with_add_player.player_options.push(new_player)

    OptionsStore.options = OptionsStore.DEFAULT_OPTIONS

    const expected_payload = {
      type: 'UPDATE_OPTIONS',
      options: options_with_add_player,
    }
    addPlayerAction()

    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })
})

describe('the updateOptionsAction action', () => {

  test('that a payload is dispatched to update the OptionsStore', () => {
    const expected_payload = {
      type: 'UPDATE_OPTIONS',
      options: JSON.parse(JSON.stringify(OptionsStore.DEFAULT_OPTIONS)),
    }
    updateOptionsAction(JSON.parse(JSON.stringify(OptionsStore.DEFAULT_OPTIONS)))

    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })

  test('that a payload is dispatched to update the OptionsStore only if the options are invalid', () => {
    const expected_payload = {
      type: 'UPDATE_OPTIONS',
      options: JSON.parse(JSON.stringify(OptionsStore.DEFAULT_OPTIONS)),
    }
    const options = JSON.parse(JSON.stringify(OptionsStore.DEFAULT_OPTIONS))
    const field_width = options.field_width
    delete options.field_width

    updateOptionsAction(options)

    expect(dispatcher.dispatch).toBeCalledTimes(0)

    options.field_width = field_width
    updateOptionsAction(options)

    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })
})

describe('the removePlayerAction action', () => {

  test('that a payload is dispatched to update the OptionsStore', () => {
    const options_with_remove_player = JSON.parse(JSON.stringify(OptionsStore.DEFAULT_OPTIONS))
    options_with_remove_player.player_options.splice(1,1)

    OptionsStore.options = OptionsStore.DEFAULT_OPTIONS

    const expected_payload = {
      type: 'UPDATE_OPTIONS',
      options: options_with_remove_player,
    }
    removePlayerAction(1)

    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })
})
