import Governor from '../src/restructure/Governor/Governor.js'
import OptionsStore from '../src/restructure/OptionsStore.js'
import GameStore from '../src/restructure/GameStore.js'
import CanvasDrawer from '../src/restructure/CanvasDrawer.js'

const valid_options = {
  field_width: '200',
  field_height: '200',
  matches: '10',
  player_options: [{
    start_coord_x: '150',
    start_coord_y: '100',
    direction: '0',
    turn_left_keycode: '65',
    turn_right_keycode: '68',
    colour: 'rgba(0,0,255, 0.5)',
  }]
}

const valid_converted_game_state = {
  field_width: 200,
  field_height: 200,
  matches: 10,
  player_state: [{
    path: [
      [ 150, 100 ],
      [ 150, 100 ],
    ],
    direction: 0,
    turn_left_keycode: 65,
    turn_right_keycode: 68,
    colour: 'rgba(0,0,255, 0.5)',
  }]
}

describe('the governors game setup', () => {

  beforeEach(() => {
    OptionsStore.options = undefined
    GameStore.state = undefined
  })

  test('that the governor fails to start the game if there are no options', () => {
    return expect(Governor.startGame()).toBeFalsy()
  })

  test('that governor can start game if the options are available', () => {
    OptionsStore.options = valid_options
    return expect(Governor.startGame()).toBeTruthy()
  })

  test('that governor creates a game store state', () => {
    OptionsStore.options = valid_options
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
