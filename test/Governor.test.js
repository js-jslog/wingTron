import Governor from '../src/restructure/Governor/Governor.js'
import GameStore from '../src/restructure/GameStore.js'
import OptionsStore from '../src/restructure/OptionsStore.js'
import * as dependency from '../src/restructure/GameActions'
import CanvasDrawer from '../src/restructure/CanvasDrawer.js'

describe('the governors resetting functionality', () => {

  test('that the GameStore is set back to NOT_STARTED', () => {
    GameStore.state = undefined
    Governor.reset()

    expect(GameStore.NOT_STARTED).toBe('NOT_STARTED')
    expect(GameStore.state).toEqual({status: GameStore.NOT_STARTED})
  })

  test('that the OptionsStore is set back to the default values', () => {
    OptionsStore.options = undefined
    Governor.reset()

    expect(OptionsStore.options).toEqual(OptionsStore.DEFAULT_OPTIONS)
  })
})

describe('the governors game setup', () => {

  beforeEach(() => {
    Governor.reset()
    dependency.startNewGame = jest.fn()
  })

  test('that the governors startGame function simple calls the startNewGame game action', () => {
    Governor.startGame()
    expect(dependency.startNewGame).toHaveBeenCalledTimes(1)
  })
})
