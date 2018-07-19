import GameLoop from '../src/restructure/GameLoop.js'
import GameStore from '../src/restructure/GameStore.js'
import CanvasDrawer from '../src/restructure/CanvasDrawer.js'

let loop_index
const ctx = {}
const canvas = { getContext: jest.fn(params => ctx) }


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
    GameLoop.run(canvas)
    
    expect(GameStore.movePlayers.mock.calls.length).toBe(0)
    expect(GameStore.calculateCollisionMatrix.mock.calls.length).toBe(0)
  })

  test('that a running game is updated', () => {
    GameStore.state.status = GameStore.RUNNING
    GameLoop.run(canvas)

    expect(GameStore.movePlayers.mock.calls.length).toBe(10)
    expect(GameStore.calculateCollisionMatrix.mock.calls.length).toBe(10)
  })

  test('that a running game is rendered', () => {
    GameStore.state.status = GameStore.RUNNING
    GameLoop.run(canvas)

    expect(CanvasDrawer.drawField.mock.calls.length).toBe(10)
    expect(CanvasDrawer.drawPaths.mock.calls.length).toBe(10)
    expect(CanvasDrawer.drawPlayers.mock.calls.length).toBe(10)
  })

  // TODO: figure out how to reset the invocationCallOrder before this test
  test('that the render functions are called in the correct order', () => {
    GameStore.state.status = GameStore.RUNNING
    GameLoop.run(canvas)

    expect(CanvasDrawer.drawField.mock.invocationCallOrder[0]).toBe(107)
    expect(CanvasDrawer.drawPaths.mock.invocationCallOrder[0]).toBe(108)
    expect(CanvasDrawer.drawPlayers.mock.invocationCallOrder[0]).toBe(109)
  })

  test('that the 2d context object is passed to the canvas drawers render function', () => {
    GameStore.state.status = GameStore.RUNNING
    GameLoop.run(canvas)

    expect(CanvasDrawer.drawField).toBeCalledWith(GameLoop.ctx)
    expect(CanvasDrawer.drawPaths).toBeCalledWith(GameLoop.ctx)
    expect(CanvasDrawer.drawPlayers).toBeCalledWith(GameLoop.ctx)
  })

  test('that the canvas object passed to the run function has a 2d context object retrieved and passed to the CanvasDrawer draw functions', () => {
    GameStore.state.status = GameStore.RUNNING
    GameLoop.run(canvas)

    expect(canvas.getContext).toBeCalledWith('2d')

    expect(CanvasDrawer.drawField).toBeCalledWith(ctx)
    expect(CanvasDrawer.drawPaths).toBeCalledWith(ctx)
    expect(CanvasDrawer.drawPlayers).toBeCalledWith(ctx)
  })
})
