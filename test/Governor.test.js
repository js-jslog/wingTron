import Governor from '../src/restructure/Governor/Governor.js'
import GameStore from '../src/restructure/GameStore.js'
import OptionsStore from '../src/restructure/OptionsStore.js'
import * as dependency from '../src/restructure/GameActions'
import CanvasDrawer from '../src/restructure/CanvasDrawer.js'

describe('the governors game setup', () => {

  beforeEach(() => {
    OptionsStore.options = OptionsStore.DEFAULT_OPTIONS
    GameStore.state = GameStore.DEFAULT_STATE
    dependency.startNewGame = jest.fn()
  })

  test('that the governors startGame function simple calls the startNewGame game action', () => {
    Governor.startGame()
    expect(dependency.startNewGame).toHaveBeenCalledTimes(1)
  })
})
