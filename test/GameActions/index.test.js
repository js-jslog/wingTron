import { startNewGame, updatePlayerPaths, updateCollisionMatrix } from '../../src/restructure/GameActions'
import optionsToGameState from '../../src/restructure/GameActions/optionsToGameState.js'
import OptionsStore from '../../src/restructure/OptionsStore.js'
import GameStore from '../../src/restructure/GameStore.js'
import dispatcher from '../../src/lib/dispatcher.js'

beforeEach(() => {
  dispatcher.dispatch = jest.fn()
})

describe('the startNewGame action', () => {

  test('that a payload is dispatched with an adaptation from the OptionsStore', () => {
    const expected_game_state = {
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
    const expected_payload = {
      type: 'START_NEW_GAME',
      state: expected_game_state,
    }
    OptionsStore.options = OptionsStore.DEFAULT_OPTIONS

    startNewGame()

    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })
    
  test('that empty options will not trigger a dispatch', () => {
    OptionsStore.options = undefined

    startNewGame()

    expect(dispatcher.dispatch).toBeCalledTimes(0)
  }) 

  test('that invalid options will not trigger a dispatch', () => {
    OptionsStore.options = OptionsStore.DEFAULT_OPTIONS
    delete OptionsStore.options.field_width

    startNewGame()

    expect(dispatcher.dispatch).toBeCalledTimes(0)
  }) 
})

describe('the player position update logic', () => {

  test('that a payload is dispatched to update player paths', () => {
    const expected_payload = {
      type: 'UPDATE_PLAYER_PATHS',
      paths: [
        [
          [151, 100],
          [150, 100],
        ],
        [
          [149, 100],
          [150, 100],
        ],
      ]
    }
    GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)

    updatePlayerPaths()

    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })
})

describe('the updateCollisionMatrix action', () => {

  test('that a payload is sent when updateCollisionMatrix is called', () => {

    updateCollisionMatrix()

    expect(dispatcher.dispatch).toBeCalledTimes(1)
  })

  test('that a non-colliding GameStore player state will return the expected matrix', () => {
    const expected_payload = {
      type: 'UPDATE_COLLISION_MATRIX',
      matrix: [
        [ false, false ],
        [ false, false ],
      ]
    }
    GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)

    updateCollisionMatrix()

    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })
})
