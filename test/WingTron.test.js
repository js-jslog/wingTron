import WingTron from '../src/restructure/WingTron.jsx'
import { getOptions, registerOptionsChangeCallback, updateGameOptions, startGame } from '../src/restructure/WingTron.jsx'
import GameLoop from '../src/restructure/GameLoop.js'
import OptionsStore from '../src/restructure/OptionsStore.js'
import GameStore from '../src/restructure/GameStore.js'
import optionsToGameState from '../src/restructure/GameActions/optionsToGameState.js'
import dispatcher from '../src/lib/dispatcher.js'

beforeEach(() => {
  OptionsStore.options = undefined
  dispatcher.dispatch = jest.fn()
})

describe('the setting of the keybindings', () => {

  test.skip('that the setKeyBindings function can be found', () => {

    expect(true).toBeTruthy()
  })
})

describe('the handling of the canvas element', () => {

  test.skip('that the canvas element is given to the GameLoop object upon mounting', () => {
    var canvas = {}
    WingTron.refs.canvas = canvas

    expect(GameLoop.canvas).toBe(canvas)
  })

  test.skip('that the canvas element is styled according to any available optionsstore options upon mount', () => {
    //const wrapper = mount(<WingTron {...props} />)
    expect(true).toBeTruthy()
  })
})

describe('the interface for interacting with the optionsstore', () => {

  test('that a json representation of the OptionsStore can be retrieved via the WingTron component', () => {
    OptionsStore.options = OptionsStore.DEFAULT_OPTIONS

    const returned_options = getOptions()
    expect(returned_options).toBe(JSON.stringify(OptionsStore.DEFAULT_OPTIONS))
  })

  test('that a callback can be registered with the WingTron component which is called each time the OptionsStore it is changed', () => {

    const callback = jest.fn()
    registerOptionsChangeCallback(callback)

    expect(callback).toBeCalledTimes(0)

    OptionsStore.updateOptionsHandler(OptionsStore.DEFAULT_OPTIONS)

    expect(callback).toBeCalledTimes(1)
  })

  test('that a json input can be passed to the WingTron component to be forwarded on to the OptionsAction\'s update function', () => {

    const expected_payload = {
      type: 'UPDATE_OPTIONS',
      options: OptionsStore.DEFAULT_OPTIONS,
    }
    updateGameOptions(JSON.stringify(OptionsStore.DEFAULT_OPTIONS))

    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })

  test('that a game can be started', () => {
    const expected_game_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    expected_game_state.status = GameStore.RUNNING

    const expected_payload = {
      type: 'START_NEW_GAME',
      state: expected_game_state,
    }

    OptionsStore.options = OptionsStore.DEFAULT_OPTIONS

    startGame()

    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })
})

describe('the interface offered for interacting with the GameStore', () => {

  test('that a callback can be registered with the WingTron component which is passed a json representation of the gamestore\'s score whenever the score itself is changed', () => {
    expect(true).toBeTruthy()
  })
})



