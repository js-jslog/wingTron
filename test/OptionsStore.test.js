import OptionsStore from '../src/restructure/OptionsStore.js'

beforeEach(() => {
  OptionsStore.options = undefined
})

test('true is true', () => {
  return expect(true).toBeTruthy()
})
