import GameLoop from '../src/restructure/GameLoop.js'
import dispatcher from '../src/lib/dispatcher.js'
import optionsToGameState from '../src/restructure/GameActions/optionsToGameState.js'
import OptionsStore from '../src/restructure/OptionsStore.js'
import GameStore from '../src/restructure/GameStore.js'
import * as CanvasDrawer from '../src/restructure/CanvasDrawer.js'

const ctx = {}
const canvas = { getContext: jest.fn(params => ctx) }
let gameLoop
let spy_update
let spy_draw
let iteration_timestamp

beforeEach(() => {
  GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
  GameStore.state.status = GameStore.RUNNING
  gameLoop = new GameLoop

  iteration_timestamp = new Date().getTime()
  gameLoop.last_frame_time = iteration_timestamp - gameLoop.update_interval

  spy_update = jest.spyOn(gameLoop, 'update')
  spy_draw = jest.spyOn(gameLoop, 'draw')

  CanvasDrawer.drawField = jest.fn()
  CanvasDrawer.drawPaths = jest.fn()
  CanvasDrawer.drawPlayers = jest.fn()
})

describe('the finite GameLoop', () => {

  test('that a non running game does not update', () => {
    GameStore.state.status = undefined
    gameLoop.addCanvas(canvas)
    gameLoop.run()
    
    expect(spy_update).toBeCalledTimes(0)
  })

  test('that a running game is updated', () => {
    gameLoop.addCanvas(canvas)
    gameLoop.run(iteration_timestamp)

    expect(spy_update).toBeCalledTimes(1)
  })

  test('that a running game calls the actions to update the player paths and collision matrix at every loop', () => {
    const dispatcherOrig = dispatcher.dispatch
    const payload_map = {}
    dispatcher.dispatch = jest.fn((payload) => {
      payload_map[payload.type] = true
    })

    gameLoop.addCanvas(canvas)
    gameLoop.run(iteration_timestamp)

    expect(dispatcher.dispatch).toBeCalledTimes(2)
    expect(payload_map.UPDATE_PLAYER_PATHS).toBe(true)
    expect(payload_map.UPDATE_COLLISION_MATRIX).toBe(true)

    dispatcher.dispatch = dispatcherOrig
  })

  test('that a running game is rendered', () => {
    GameStore.state.status = GameStore.RUNNING
    gameLoop.addCanvas(canvas)
    gameLoop.run()

    expect(gameLoop.draw).toBeCalledTimes(1)
  })

  // TODO: figure out how to reset the invocationCallOrder before this test
  test('that the render functions are called in the correct order', () => {
    const gameLoop = new GameLoop
    GameStore.state.status = GameStore.RUNNING
    gameLoop.addCanvas(canvas)
    gameLoop.run()

    expect(CanvasDrawer.drawField.mock.invocationCallOrder[0]).toBe(22)
    expect(CanvasDrawer.drawPaths.mock.invocationCallOrder[0]).toBe(23)
    expect(CanvasDrawer.drawPlayers.mock.invocationCallOrder[0]).toBe(24)
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

  test.skip('that the canvas object passed to the run function has a 2d context object retrieved and passed to the CanvasDrawer draw functions', () => {
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
