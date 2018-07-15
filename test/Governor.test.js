import Governor from '../src/restructure/Governor/Governor.js'
import OptionsStore from '../src/restructure/OptionsStore.js'
import GameStore from '../src/restructure/GameStore.js'
import CanvasDrawer from '../src/restructure/CanvasDrawer.js'

const valid_converted_game_state = {
  field_width: 200,
  field_height: 200,
  matches: 10,
  player_state: [
  {
    path: [
      [ 150, 100 ],
      [ 150, 100 ],
    ],
    direction: 0,
    turn_left_keycode: 37,
    turn_right_keycode: 39,
    colour: 'rgba(255,0,0, 0.5)',
  },
  {
    path: [
      [ 150, 100 ],
      [ 150, 100 ],
    ],
    direction: Math.PI,
    turn_left_keycode: 65,
    turn_right_keycode: 68,
    colour: 'rgba(0,0,255, 0.5)',
  },
  ],
  status: GameStore.RUNNING,
}

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
  })

  test('that the governor fails to start the game if there are no options', () => {
    OptionsStore.options = undefined
    Governor.startGame()
    expect(GameStore.state.status).not.toBe(GameStore.RUNNING)
  })

  test('that governor can start game if the options are available', () => {
    Governor.startGame()
    expect(GameStore.state.status).toBe(GameStore.RUNNING)
  })

  test('that governor creates a game store state', () => {
    Governor.startGame()
    expect(GameStore.state).toEqual(valid_converted_game_state)
  })
})

describe('the governors rendering role', () => {

  beforeEach(() => {
    Governor.ctx = undefined
    CanvasDrawer.drawField = jest.fn()
    CanvasDrawer.drawPlayers = jest.fn()
    CanvasDrawer.drawPaths = jest.fn()
  })

  test('that the governor calls the canvas drawers render functions', () => {
    Governor.render()

    expect(CanvasDrawer.drawField.mock.calls.length).toBe(1)
    expect(CanvasDrawer.drawPaths.mock.calls.length).toBe(1)
    expect(CanvasDrawer.drawPlayers.mock.calls.length).toBe(1)
  })

  test('that the governor passes a 2d context object to the canvas drawers render function', () => {
    Governor.render()

    expect(CanvasDrawer.drawField).toBeCalledWith(Governor.ctx)
    expect(CanvasDrawer.drawPaths).toBeCalledWith(Governor.ctx)
    expect(CanvasDrawer.drawPlayers).toBeCalledWith(Governor.ctx)
  })

  test.skip('that the render functions are called in the correct order', () => {
    Governor.render()

    expect(CanvasDrawer.drawField.mock.invocationCallOrder[0]).toBe(0)
    expect(CanvasDrawer.drawPaths.mock.invocationCallOrder[0]).toBe(1)
    expect(CanvasDrawer.drawPlayers.mock.invocationCallOrder[0]).toBe(2)
  })
})
