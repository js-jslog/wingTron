import WingTron from '../src/lib/WingTron.jsx'
import { getOptions, addPlayer, removePlayer, registerOptionsChangeCallback, registerDeathChangeCallback, updateGameOptions, startGame } from '../src/lib/WingTron.jsx'
import GameLoop from '../src/lib/GameLoop.js'
import OptionsStore from '../src/lib/OptionsStore.js'
import GameStore from '../src/lib/GameStore.js'
import optionsToGameState from '../src/lib/GameActions/optionsToGameState.js'
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

  // TODO: rather than observing the contents of the options store directly, this test should probably just check the return value of getOptions, update the options and check again
  test('that if the OptionsStore options are not set at the point that getOptions is called, WingTron will set the OptionsStore to it\'s default options', () => {
    OptionsStore.options = undefined

    const expected_options = JSON.stringify(OptionsStore.DEFAULT_OPTIONS)
    const returned_options = getOptions()

    expect(returned_options).toEqual(expected_options)
  })

  // TODO: perhaps all of the actions should have a callback parameter so that I can use
  // that instead of leaning on the registerOptionsChangeCallback function
  test('that a player add dispatch can be generated from the WingTron interface', () => {

    const player_added_options = JSON.parse(JSON.stringify(OptionsStore.DEFAULT_OPTIONS))
    player_added_options.player_options.push(JSON.parse(JSON.stringify(OptionsStore.DEFAULT_OPTIONS.player_options[0])))
    const expected_payload = {
      type: 'UPDATE_OPTIONS',
      options: player_added_options,
    }

    OptionsStore.options = OptionsStore.DEFAULT_OPTIONS
    addPlayer()
    
    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })

  test('that a player remove dispatch can be generated from the WingTron interface', () => {

    const player_removed_options = JSON.parse(JSON.stringify(OptionsStore.DEFAULT_OPTIONS))
    player_removed_options.player_options.splice(0, 1)
    const expected_payload = {
      type: 'UPDATE_OPTIONS',
      options: player_removed_options,
    }

    OptionsStore.options = OptionsStore.DEFAULT_OPTIONS
    removePlayer(0)
    
    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
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
})

describe('the interface offered for interacting with the GameStore', () => {

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

  test('that a callback can be registered with the WingTron component which is passes a json representation of the death state of the players whenever it is change', () => {
    const callback = jest.fn()
    const death_array = [ true, false ]
    registerDeathChangeCallback(callback)

    expect(callback).toBeCalledTimes(0)

    GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    GameStore.state.player_state[0].dead = false
    GameStore.state.player_state[1].dead = false
    GameStore.updatePlayerDeathsHandler(death_array)

    expect(callback).toBeCalledTimes(1)
    expect(callback).toBeCalledWith(death_array)
  })
})
