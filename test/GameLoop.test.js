import GameLoop from '../src/restructure/GameLoop.js'
import GameStore from '../src/restructure/GameStore.js'
import Governor from '../src/restructure/Governor/Governor.js'

beforeEach(() => {
  GameStore.state = {}
  GameStore.movePlayers = jest.fn()
  GameStore.calculateCollisionMatrix = jest.fn()
  Governor.render = jest.fn()
})

describe('the finite GameLoop', () => {

  test('that a non running game does update', () => {
    GameStore.state.running = false
    GameLoop.run()
    
    expect(GameStore.movePlayers.mock.calls.length).toBe(0)
    expect(GameStore.calculateCollisionMatrix.mock.calls.length).toBe(0)
  })

  test('that a running game is updated', () => {
    GameStore.state.running = true
    GameLoop.run()

    expect(GameStore.movePlayers.mock.calls.length).toBe(1)
    expect(GameStore.calculateCollisionMatrix.mock.calls.length).toBe(1)
  })

  test('that a running game is rendered', () => {
    GameStore.state.running = true
    GameLoop.run()

    expect(Governor.render.mock.calls.length).toBe(1)
  })
})
