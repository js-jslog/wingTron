import GameLoop from '../src/restructure/GameLoop.js'
import dispatcher from '../src/lib/dispatcher.js'
import optionsToGameState from '../src/restructure/GameActions/optionsToGameState.js'
import OptionsStore from '../src/restructure/OptionsStore.js'
import GameStore from '../src/restructure/GameStore.js'
import CanvasDrawer from '../src/restructure/CanvasDrawer.js'

let loop_index
const ctx = {}
const canvas = { getContext: jest.fn(params => ctx) }


beforeEach(() => {
  loop_index = 0
  GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
  GameStore.state.status = GameStore.RUNNING
  CanvasDrawer.drawField = jest.fn()
  CanvasDrawer.drawPaths = jest.fn()
  CanvasDrawer.drawPlayers = jest.fn()
})

describe('the finite GameLoop', () => {

  test('that a non running game does not update', () => {
    const gameLoop = new GameLoop
    GameStore.state.status = undefined
    gameLoop.addCanvas(canvas)
    gameLoop.run()
    
    expect(CanvasDrawer.drawField.mock.calls.length).toBe(0)
  })

  test('that a running game is updated', () => {
    const gameLoop = new GameLoop
    GameStore.state.status = GameStore.RUNNING
    gameLoop.addCanvas(canvas)
    gameLoop.run()

    expect(CanvasDrawer.drawField).toBeCalledTimes(1)
  })

  test('that a running game calls the actions to update the player paths and collision matrix at every loop', () => {
    const gameLoop = new GameLoop
    const dispatcherOrig = dispatcher.dispatch
    const payload_map = {}
    const iteration_timestamp = new Date().getTime()
    gameLoop.last_frame_time = iteration_timestamp - gameLoop.update_interval
    dispatcher.dispatch = jest.fn((payload) => {
      payload_map[payload.type] = true
    })

    GameStore.state.status = GameStore.RUNNING
    gameLoop.addCanvas(canvas)
    gameLoop.run(iteration_timestamp)

    expect(dispatcher.dispatch).toBeCalledTimes(2)
    expect(payload_map.UPDATE_PLAYER_PATHS).toBe(true)
    expect(payload_map.UPDATE_COLLISION_MATRIX).toBe(true)

    dispatcher.dispatch = dispatcherOrig
  })

  test('that a running game is rendered', () => {
    const gameLoop = new GameLoop
    GameStore.state.status = GameStore.RUNNING
    gameLoop.addCanvas(canvas)
    gameLoop.run()

    expect(CanvasDrawer.drawField.mock.calls.length).toBe(1)
    expect(CanvasDrawer.drawPaths.mock.calls.length).toBe(1)
    expect(CanvasDrawer.drawPlayers.mock.calls.length).toBe(1)
  })

  // TODO: figure out how to reset the invocationCallOrder before this test
  test('that the render functions are called in the correct order', () => {
    const gameLoop = new GameLoop
    GameStore.state.status = GameStore.RUNNING
    gameLoop.addCanvas(canvas)
    gameLoop.run()

    expect(CanvasDrawer.drawField.mock.invocationCallOrder[0]).toBe(17)
    expect(CanvasDrawer.drawPaths.mock.invocationCallOrder[0]).toBe(18)
    expect(CanvasDrawer.drawPlayers.mock.invocationCallOrder[0]).toBe(19)
  })

  test('that the 2d context object is passed to the canvas drawers render function', () => {
    const gameLoop = new GameLoop
    GameStore.state.status = GameStore.RUNNING
    gameLoop.addCanvas(canvas)
    gameLoop.run()

    expect(CanvasDrawer.drawField).toBeCalledWith(gameLoop.ctx)
    expect(CanvasDrawer.drawPaths).toBeCalledWith(gameLoop.ctx)
    expect(CanvasDrawer.drawPlayers).toBeCalledWith(gameLoop.ctx)
  })

  test('that the canvas object passed to the run function has a 2d context object retrieved and passed to the CanvasDrawer draw functions', () => {
    const gameLoop = new GameLoop
    GameStore.state.status = GameStore.RUNNING
    gameLoop.addCanvas(canvas)
    gameLoop.run()

    expect(canvas.getContext).toBeCalledWith('2d')

    expect(CanvasDrawer.drawField).toBeCalledWith(ctx)
    expect(CanvasDrawer.drawPaths).toBeCalledWith(ctx)
    expect(CanvasDrawer.drawPlayers).toBeCalledWith(ctx)
  })
})
