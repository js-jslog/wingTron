import setKeyBindings from '../src/restructure/setKeyBindings.js'
import WingTron from '../src/restructure/WingTron.js'
// outputs a canvas element to the page
// hands off a document and the canvas element to be dealt with as follows:
//  - document: simply to send straight have event handlers attached to it's keyup & down events
//  - have the context taken from it and continuously updated by a game looper

//setKeyBindings = jest.fn()

describe('the setting of the keybindings', () => {

  test('that the setKeyBindings function can be found', () => {

    expect(true).toBeTruthy()
  })
})
