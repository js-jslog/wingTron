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
  CanvasDrawer.drawField = jest.fn(() => {
    if (loop_index === 9) {
      GameStore.state.status = GameStore.ENDED
    }
    loop_index +=1
  })
  CanvasDrawer.drawPaths = jest.fn()
  CanvasDrawer.drawPlayers = jest.fn()
})

describe('the finite GameLoop', () => {

  test('that a non running game does not update', () => {
    GameStore.state.status = undefined
    GameLoop.run(canvas)
    
    expect(CanvasDrawer.drawField.mock.calls.length).toBe(0)
  })

  test('that a running game is updated', () => {
    GameStore.state.status = GameStore.RUNNING
    GameLoop.run(canvas)

    expect(CanvasDrawer.drawField.mock.calls.length).toBe(10)
  })

  test('that a running game calls the actions to update the player paths and collision matrix at every loop', () => {
    const dispatcherOrig = dispatcher.dispatch
    const payload_map = {}
    dispatcher.dispatch = jest.fn((payload) => {
      if (payload_map[payload.type]) {
        payload_map[payload.type] += 1
      } else {
        payload_map[payload.type] = 1
      }
    })

    GameStore.state.status = GameStore.RUNNING
    GameLoop.run(canvas)

    expect(dispatcher.dispatch).toBeCalledTimes(20)
    expect(payload_map.UPDATE_PLAYER_PATHS).toBe(10)
    expect(payload_map.UPDATE_COLLISION_MATRIX).toBe(10)

    dispatcher.dispatch = dispatcherOrig
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

    expect(CanvasDrawer.drawField.mock.invocationCallOrder[0]).toBe(116)
    expect(CanvasDrawer.drawPaths.mock.invocationCallOrder[0]).toBe(117)
    expect(CanvasDrawer.drawPlayers.mock.invocationCallOrder[0]).toBe(118)
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
