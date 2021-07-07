import { startGameAction, updatePlayerPathsAction, updateCollisionMatrixAction, updatePlayerDeathsAction, updateScores, handleKeyEventsAction } from '~/GameActions'
import optionsToGameState from '~/GameActions/optionsToGameState.js'
import { reducePlayerStates } from '~/GameActions/reduceGameStoreState.js'
import OptionsStore from '~/OptionsStore.js'
import GameStore from '~/GameStore.js'
import dispatcher from '~/dispatcher.js'

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

describe('the updateCollisionMatrixAction action', () => {

  test('that a payload is dispatched to upate the collision matrix', () => {
    const expected_payload = {
      type: 'UPDATE_COLLISION_MATRIX',
      matrix: [
        [ false, false ],
        [ false, false ],
      ]
    }
    GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)

    updateCollisionMatrixAction()

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

    updateCollisionMatrixAction()
    expect(dispatcher.dispatch).toBeCalledTimes(1)

    GameStore.state.collision_matrix = non_colliding_matrix

    updateCollisionMatrixAction()

    expect(dispatcher.dispatch).toBeCalledTimes(1)

    GameStore.state.player_state[0].path = self_collision_path

    updateCollisionMatrixAction()

    expect(dispatcher.dispatch).toBeCalledTimes(2)
  })
})

describe('the updatePlayerDeathsAction action', () => {

  test('that a payload is dispatched to upate the player deaths', () => {
    const collision_matrix = [
      [ true, false ],
      [ false, false ]
    ]
    const expected_payload = {
      type: 'UPDATE_PLAYER_DEATHS',
      deaths: [ true, false ]
    }

    updatePlayerDeathsAction(collision_matrix)

    expect(dispatcher.dispatch).toBeCalledTimes(1)
    expect(dispatcher.dispatch).toBeCalledWith(expected_payload)
  })

  test('that a payload is not dispatched to upate the player death properties if the deaths have not changed', () => {
    const collision_matrix = [
      [ true, false ],
      [ false, false ]
    ]
    const expected_payload = {
      type: 'UPDATE_PLAYER_DEATHS',
      deaths: [ true, false ]
    }
    GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    GameStore.state.player_state[0].dead = true
    GameStore.state.player_state[1].dead = false

    updatePlayerDeathsAction(collision_matrix)

    expect(dispatcher.dispatch).toBeCalledTimes(0)
  })
})

describe('the handleKeyEventsAction action', () => {

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
      type: 'keydown',
    }

    handleKeyEventsAction(key_event)

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
      type: 'keydown',
    }

    handleKeyEventsAction(key_event)

    expect(dispatcher.dispatch).toBeCalledTimes(2)
    expect(dispatcher.dispatch).toBeCalledWith(expected_paths_payload)
    expect(dispatcher.dispatch).toBeCalledWith(expected_directions_payload)
  })

  test('an event with a keycode which relates to a players right turn produces a dispatch to update the players paths on keydown but not key up', () => {

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
      type: 'keydown'
    }

    handleKeyEventsAction(key_event)

    expect(dispatcher.dispatch).toBeCalledTimes(2)
    expect(dispatcher.dispatch).toBeCalledWith(expected_paths_payload)
    expect(dispatcher.dispatch).toBeCalledWith(expected_directions_payload)

    key_event.type = 'keyup'

    handleKeyEventsAction(key_event)

    expect(dispatcher.dispatch).toBeCalledTimes(2)
  })
})
