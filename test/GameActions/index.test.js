import { startGameAction, updatePlayerPathsAction, updateCollisionMatrix, updatePlayerDeaths, updateScores, handleKeyEvents } from '../../src/restructure/GameActions'
import optionsToGameState from '../../src/restructure/GameActions/optionsToGameState.js'
import { reducePlayerStates } from '../../src/restructure/GameActions/reduceGameStoreState.js'
import OptionsStore from '../../src/restructure/OptionsStore.js'
import GameStore from '../../src/restructure/GameStore.js'
import dispatcher from '../../src/lib/dispatcher.js'

beforeEach(() => {
  dispatcher.dispatch = jest.fn()
})

describe('the startGameAction action', () => {

  test('that a payload is dispatched with an adaptation from the OptionsStore', () => {
    const expected_game_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    expected_game_state.status = GameStore.RUNNING

    const expected_payload = {
      type: 'START_NEW_GAME',
      state: expected_game_state,
    }
    OptionsStore.options = OptionsStore.DEFAULT_OPTIONS

    startGameAction()

    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })
    
  test('that empty options will not trigger a dispatch', () => {
    OptionsStore.options = undefined

    startGameAction()

    expect(dispatcher.dispatch).toBeCalledTimes(0)
  }) 

  test('that invalid options will not trigger a dispatch', () => {
    OptionsStore.options = OptionsStore.DEFAULT_OPTIONS
    delete OptionsStore.options.field_width

    startGameAction()

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

    updatePlayerPathsAction()

    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })
})

describe('the updateCollisionMatrix action', () => {

  test('that a payload is dispatched to upate the collision matrix', () => {
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

  test('that a payload is only dispatched if the collision matrix has changed', () => {
    const non_colliding_matrix = [
      [ false, false ],
      [ false, false ],
    ]
    const self_collision_path = [
      [ 90, 90 ],
      [ 90, 100 ],
      [ 100, 100 ],
      [ 100, 0 ],
      [ 0, 0 ],
    ]
    GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)

    updateCollisionMatrix()
    expect(dispatcher.dispatch).toBeCalledTimes(1)

    GameStore.state.collision_matrix = non_colliding_matrix

    updateCollisionMatrix()

    expect(dispatcher.dispatch).toBeCalledTimes(1)

    GameStore.state.player_state[0].path = self_collision_path

    updateCollisionMatrix()

    expect(dispatcher.dispatch).toBeCalledTimes(2)
  })
})

describe('the updateDeaths action', () => {

  test('that a payload is dispatched to upate the player deaths array', () => {
    const collision_matrix = [
      [ true, false ],
      [ false, false ]
    ]
    const expected_payload = {
      type: 'UPDATE_PLAYER_DEATHS',
      deaths: [ true, false ]
    }
    GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    GameStore.state.collision_matrix = collision_matrix

    updatePlayerDeaths()

    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })
})

describe('the handleKeyEvents action', () => {

  test('that the handleKeyEvent function exists', () => {
    expect(handleKeyEvents).toBeTruthy()
  })

  test('an event with a keycode which relates to a players left turn produces a dispatch to update the players paths', () => {

    const valid_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    GameStore.state = valid_state

    const paths = reducePlayerStates(valid_state.player_state, 'path')
    paths[0].push(JSON.parse(JSON.stringify(paths[0][0])))

    const directions = reducePlayerStates(valid_state.player_state, 'direction')
    directions[0] = (-1 * Math.PI * 0.5)

    const expected_paths_payload = {
      type: 'UPDATE_PLAYER_PATHS',
      paths: paths
    }
    const expected_directions_payload = {
      type: 'UPDATE_PLAYER_DIRECTIONS',
      directions: directions,
    }

    const key_event = {
      keyCode: GameStore.state.player_state[0].turn_left_keycode,
    }

    handleKeyEvents(key_event)

    expect(dispatcher.dispatch).toBeCalledTimes(2)
    expect(dispatcher.dispatch).toBeCalledWith(expected_paths_payload)
    expect(dispatcher.dispatch).toBeCalledWith(expected_directions_payload)
  })

  test('an event with a keycode which relates to a players right turn produces a dispatch to update the players paths', () => {

    const valid_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    GameStore.state = valid_state

    const paths = reducePlayerStates(valid_state.player_state, 'path')
    paths[1].push(JSON.parse(JSON.stringify(paths[1][0])))

    const directions = reducePlayerStates(valid_state.player_state, 'direction')
    directions[1] = (Math.PI * 1.5)

    const expected_paths_payload = {
      type: 'UPDATE_PLAYER_PATHS',
      paths: paths,
    }
    const expected_directions_payload = {
      type: 'UPDATE_PLAYER_DIRECTIONS',
      directions: directions,
    }

    const key_event = {
      keyCode: GameStore.state.player_state[1].turn_right_keycode,
    }

    handleKeyEvents(key_event)

    expect(dispatcher.dispatch).toBeCalledTimes(2)
    expect(dispatcher.dispatch).toBeCalledWith(expected_paths_payload)
    expect(dispatcher.dispatch).toBeCalledWith(expected_directions_payload)
  })
})
