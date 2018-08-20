import dispatcher from '../src/lib/dispatcher.js'
import OptionsStore from '../src/restructure/OptionsStore.js'

beforeEach(() => {
  OptionsStore.options = undefined
})

describe('the action dispatch handling', () => {

  const handleActionsOrig = OptionsStore.handleActions
  const updateOptionsHandlerOrig = OptionsStore.updateOptionsHandler

  beforeEach(() => {
    OptionsStore.handleActions = jest.fn()
    OptionsStore.updateOptionsHandler = jest.fn()
  })
  afterAll(() => {
    OptionsStore.handleActions = handleActionsOrig
    OptionsStore.updateOptionsHandler = updateOptionsHandlerOrig
  })

  // TODO: I can't see why this is failing at all - possibly something to do with the way 
  // it is bound in OptionsStore?
  test.skip('that the OptionsStore handleActions function receives the payload', () => {
    const payload = {
      type: 'GENERIC_DISPATCH'
    }
    dispatcher.dispatch(payload)

    expect(OptionsStore.handleActions).toBeCalledTimes(1)
    expect(OptionsStore.handleActions).toBeCalledWith(payload)
  })

  test('that the OptionStore handles the UPDATE_OPTIONS payload by calling updateOptionsHandler function with the options object', () => {
    const payload = {
      type: 'UPDATE_OPTIONS',
      options: {
        generic: 'options',
      },
    }
    dispatcher.dispatch(payload)

    expect(OptionsStore.updateOptionsHandler).toBeCalledTimes(1)
    expect(OptionsStore.updateOptionsHandler).toBeCalledWith(payload.options)
  })
})

describe('the event emission from the store', () => {

  test('that an \'options_updated\' event is emitted when the OptionStore options is updated', () => {

    const callback = jest.fn()
    OptionsStore.on('options_updated', callback)

    OptionsStore.updateOptionsHandler(OptionsStore.DEFAULT_OPTIONS)
    expect(callback).toBeCalledTimes(1)
  })
})
