import GameLoop from '../src/restructure/GameLoop.js'
import GameStore from '../src/restructure/GameStore.js'
import CanvasDrawer from '../src/restructure/CanvasDrawer.js'

let loop_index

beforeEach(() => {
  loop_index = 0
  GameStore.state = {}
  GameStore.movePlayers = jest.fn()
  GameStore.calculateCollisionMatrix = jest.fn(() => {
    if (loop_index === 9) {
      GameStore.state.status = GameStore.ENDED
    }
    loop_index +=1
  })
  CanvasDrawer.drawField = jest.fn()
  CanvasDrawer.drawPaths = jest.fn()
  CanvasDrawer.drawPlayers = jest.fn()
})

describe('the finite GameLoop', () => {

  test('that a non running game does update', () => {
    GameStore.state.status = undefined
    GameLoop.run()
    
    expect(GameStore.movePlayers.mock.calls.length).toBe(0)
    expect(GameStore.calculateCollisionMatrix.mock.calls.length).toBe(0)
  })

  test('that a running game is updated', () => {
    GameStore.state.status = GameStore.RUNNING
    GameLoop.run()

    expect(GameStore.movePlayers.mock.calls.length).toBe(10)
    expect(GameStore.calculateCollisionMatrix.mock.calls.length).toBe(10)
  })

  test('that a running game is rendered', () => {
    GameStore.state.status = GameStore.RUNNING
    GameLoop.run()

    expect(CanvasDrawer.drawField.mock.calls.length).toBe(10)
    expect(CanvasDrawer.drawPaths.mock.calls.length).toBe(10)
    expect(CanvasDrawer.drawPlayers.mock.calls.length).toBe(10)
  })

  test('that the render functions are called in the correct order', () => {
    GameStore.state.status = GameStore.RUNNING
    GameLoop.run()

    expect(CanvasDrawer.drawField.mock.invocationCallOrder[0]).toBe(103)
    expect(CanvasDrawer.drawPaths.mock.invocationCallOrder[0]).toBe(104)
    expect(CanvasDrawer.drawPlayers.mock.invocationCallOrder[0]).toBe(105)
  })

  test('that the 2d context object is passed to the canvas drawers render function', () => {
    GameStore.state.status = GameStore.RUNNING
    GameLoop.run()

    expect(CanvasDrawer.drawField).toBeCalledWith(GameLoop.ctx)
    expect(CanvasDrawer.drawPaths).toBeCalledWith(GameLoop.ctx)
    expect(CanvasDrawer.drawPlayers).toBeCalledWith(GameLoop.ctx)
  })
})
