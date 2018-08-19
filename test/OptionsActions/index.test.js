import { updateOptions } from '../../src/restructure/OptionsActions'
import OptionsStore from '../../src/restructure/OptionsStore.js'
import dispatcher from '../../src/lib/dispatcher.js'

beforeEach(() => {
  dispatcher.dispatch = jest.fn()
})

describe('the updateOptions action', () => {

  test('that a payload is dispatched to update the OptionsStore', () => {
    const expected_payload = {
      type: 'UPDATE_OPTIONS',
      options: JSON.parse(JSON.stringify(OptionsStore.DEFAULT_OPTIONS)),
    }
    updateOptions(JSON.parse(JSON.stringify(OptionsStore.DEFAULT_OPTIONS)))

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

    updateOptions(options)

    expect(dispatcher.dispatch).toBeCalledTimes(0)

    options.field_width = field_width
    updateOptions(options)

    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })
})
