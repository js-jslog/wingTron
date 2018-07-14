import GameLoop from '../src/restructure/GameLoop.js'
import GameStore from '../src/restructure/GameStore.js'

beforeEach(() => {
  GameStore.state = {}
  GameStore.update = jest.fn()
})

describe('the finite GameLoop', () => {

  test('that a non running game does update', () => {
    GameStore.state.running = false
    GameLoop.run()
    
    expect(GameStore.update.mock.calls.length).toBe(0)
  })

  test('that a running game is updated', () => {
    GameStore.state.running = true
    GameLoop.run()

    expect(GameStore.update.mock.calls.length).toBe(1)
  })
})
