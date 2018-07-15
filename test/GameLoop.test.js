import GameLoop from '../src/restructure/GameLoop.js'
import GameStore from '../src/restructure/GameStore.js'
import Governor from '../src/restructure/Governor/Governor.js'

beforeEach(() => {
  GameStore.state = {}
  GameStore.movePlayers = jest.fn()
  GameStore.calculateCollisionMatrix = jest.fn(() => GameStore.state.status = GameStore.ENDED)
  Governor.render = jest.fn()
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

    expect(GameStore.movePlayers.mock.calls.length).toBe(1)
    expect(GameStore.calculateCollisionMatrix.mock.calls.length).toBe(1)
  })

  test('that a running game is rendered', () => {
    GameStore.state.status = GameStore.RUNNING
    GameLoop.run()

    expect(Governor.render.mock.calls.length).toBe(1)
  })

  test('that a game can run for multiple iterations', () => {
    let loop_index = 0
    GameStore.calculateCollisionMatrix = jest.fn(() => {
      if (loop_index === 9) {
        GameStore.state.status = GameStore.ENDED
      }
      loop_index +=1
    })
    GameStore.state.status = GameStore.RUNNING
    GameLoop.run()

    expect(Governor.render.mock.calls.length).toBe(10)
  })
})
