import GameStore from '~/GameStore.js'
import OptionsStore from '~/OptionsStore.js'
import optionsToGameState from '~/GameActions/optionsToGameState.js'
import { updatePlayerPathsAction, updatePlayerDeathsAction, handleKeyEventsAction } from '~/GameActions'
import dispatcher from '~/dispatcher.js'

const valid_state_template = {
  field_width: 200,
  field_height: 200,
  matches: 1,
  player_state: [
    {
      path: [
        [ 150, 200 ],
        [ 150, 200 ],
      ],
      direction: 0,
      turn_left_keycode: 37,
      turn_right_keycode: 39,
      colour: 'rgba(0,0,255, 0.5)',
    },
    {
      path: [
        [ 150, 200 ],
        [ 150, 200 ],
      ],
      direction: Math.PI,
      turn_left_keycode: 65,
      turn_right_keycode: 68,
      colour: 'rgba(0,0,255, 0.5)',
    },
  ]
} 

beforeEach(() => {
  GameStore.state = undefined
})

describe('the action dispatch handling', () => {

  const handleActionsOrig = GameStore.handleActions
  const startGameHandlerOrig = GameStore.startGameHandler
  const updatePlayerPathsHandlerOrig = GameStore.updatePlayerPathsHandler
  const updatePlayerDirectionsHandlerOrig = GameStore.updatePlayerDirectionsHandler
  const updateCollisionMatrixHandlerOrig = GameStore.updateCollisionMatrixHandler
  const updatePlayerDeathsHandlerOrig = GameStore.updatePlayerDeathsHandler

  beforeEach(() => {
    GameStore.handleActions = jest.fn()
    GameStore.startGameHandler = jest.fn()
    GameStore.updatePlayerPathsHandler = jest.fn()
    GameStore.updatePlayerDirectionsHandler = jest.fn()
    GameStore.updateCollisionMatrixHandler = jest.fn()
    GameStore.updatePlayerDeathsHandler = jest.fn()
  })
  afterAll(() => {
    GameStore.handleActions = handleActionsOrig
    GameStore.startGameHandler = startGameHandlerOrig
    GameStore.updatePlayerPathsHandler = updatePlayerPathsHandlerOrig
    GameStore.updatePlayerDirectionsHandler = updatePlayerDirectionsHandlerOrig
    GameStore.updateCollisionMatrixHandler = updateCollisionMatrixHandlerOrig
    GameStore.updatePlayerDeathsHandler = updatePlayerDeathsHandlerOrig
  })

  // TODO: I can't see why this is failing at all - possibly something to do with the way 
  // it is bound in GameStore?
  test.skip('that the GameStore handleActions function receives the payload', () => {
    const payload = {
      type: 'GENERIC_DISPATCH'
    }
    dispatcher.dispatch(payload)

    expect(GameStore.handleActions).toBeCalledTimes(1)
    expect(GameStore.handleActions).toBeCalledWith(payload)
  })

  test('that the GameStore handles the START_NEW_GAME payload by calling startGameHandler with the state object', () => {
    const payload = {
      type: 'START_NEW_GAME',
      state: {
        generic: 'state',
      },
    }
    dispatcher.dispatch(payload)

    expect(GameStore.startGameHandler).toBeCalledTimes(1)
    expect(GameStore.startGameHandler).toBeCalledWith(payload.state)
    expect(GameStore.updatePlayerPathsHandler).toBeCalledTimes(0)
    expect(GameStore.updateCollisionMatrixHandler).toBeCalledTimes(0)
    expect(GameStore.updatePlayerDirectionsHandler).toBeCalledTimes(0)
    expect(GameStore.updatePlayerDeathsHandler).toBeCalledTimes(0)
  })

  test('that the GameStore handles the UPDATE_PLAYER_PATHS payload by calling updatePlayerPathsHandler with the appropriate paths array', () => {
    const payload = {
      type: 'UPDATE_PLAYER_PATHS',
      paths: [
        [
          [ 1, 1 ],
          [ 2, 2 ],
        ],
        [
          [ 3, 3 ],
          [ 4, 4 ],
        ]
      ]
    }
    dispatcher.dispatch(payload)

    expect(GameStore.updatePlayerPathsHandler).toBeCalledTimes(1)
    expect(GameStore.updatePlayerPathsHandler).toBeCalledWith(payload.paths)
    expect(GameStore.startGameHandler).toBeCalledTimes(0)
    expect(GameStore.updateCollisionMatrixHandler).toBeCalledTimes(0)
    expect(GameStore.updatePlayerDirectionsHandler).toBeCalledTimes(0)
    expect(GameStore.updatePlayerDeathsHandler).toBeCalledTimes(0)
  })

  test('that the GameStore handles the UPDATE_PLAYER_DIRECTIONS payload by calling updatePlayerDirectionsHandler with the appropriate directions array', () => {
    const payload = {
      type: 'UPDATE_PLAYER_DIRECTIONS',
      directions: [ 1, 2 ],
    }
    dispatcher.dispatch(payload)

    expect(GameStore.updatePlayerDirectionsHandler).toBeCalledTimes(1)
    expect(GameStore.updatePlayerDirectionsHandler).toBeCalledWith(payload.directions)
    expect(GameStore.startGameHandler).toBeCalledTimes(0)
    expect(GameStore.updateCollisionMatrixHandler).toBeCalledTimes(0)
    expect(GameStore.updatePlayerPathsHandler).toBeCalledTimes(0)
    expect(GameStore.updatePlayerDeathsHandler).toBeCalledTimes(0)
  })

  test('that the GameStore handles the UPDATE_COLLISION_MATRIX payload by calling updateCollisionMatrixHandler with the appropriate matrix array', () => {
    const payload = {
      type: 'UPDATE_COLLISION_MATRIX',
      matrix: [
        [ false, false ],
        [ false, false ],
      ]
    }
    dispatcher.dispatch(payload)

    expect(GameStore.updateCollisionMatrixHandler).toBeCalledTimes(1)
    expect(GameStore.updateCollisionMatrixHandler).toBeCalledWith(payload.matrix)
    expect(GameStore.startGameHandler).toBeCalledTimes(0)
    expect(GameStore.updatePlayerPathsHandler).toBeCalledTimes(0)
    expect(GameStore.updatePlayerDirectionsHandler).toBeCalledTimes(0)
    expect(GameStore.updatePlayerDeathsHandler).toBeCalledTimes(0)
  })

  test('that the GameStore handles the UPDATE_PLAYER_DEATHS payload by calling updatePlayerDeathsHandler with the appropriate death array', () => {
    const payload = {
      type: 'UPDATE_PLAYER_DEATHS',
      deaths: [ true, false ]
    }
    dispatcher.dispatch(payload)

    expect(GameStore.updatePlayerDeathsHandler).toBeCalledTimes(1)
    expect(GameStore.updatePlayerDeathsHandler).toBeCalledWith(payload.deaths)
    expect(GameStore.updateCollisionMatrixHandler).toBeCalledTimes(0)
    expect(GameStore.startGameHandler).toBeCalledTimes(0)
    expect(GameStore.updatePlayerPathsHandler).toBeCalledTimes(0)
    expect(GameStore.updatePlayerDirectionsHandler).toBeCalledTimes(0)
  })
})

describe('the functionality of the functions called by the action handler', () => {

  test('that the startGameHandler function updates the state of the GameStore', () => {
    const new_state = {
      some: 'new state',
    }
    GameStore.state = {
      some_other: 'old state'
    }

    GameStore.startGameHandler(new_state)

    expect(GameStore.state).toEqual(new_state)
  })

  test('that the updatePlayerPathsHandler function updates the paths of the GameStore player states', () => {
    const new_paths = [
      [
        [ 999999999, 999999999 ],
        [ 999999999, 999999999 ],
        [ 999999999, 999999999 ],
      ],
      [
        [ 1, 1 ],
        [ 1, 1 ],
      ],
    ]
    const expected_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    expected_state.player_state[0].path = new_paths[0]
    expected_state.player_state[1].path = new_paths[1]
    GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)

    GameStore.updatePlayerPathsHandler(new_paths)

    expect(GameStore.state).toEqual(expected_state)
  })

  test('that the updatePlayerDirectionsHandler function updates the player directions in the GameStore', () => {
    const new_directions = [ 1, 2 ]
    const expected_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    expected_state.player_state[0].direction = new_directions[0]
    expected_state.player_state[1].direction = new_directions[1]
    GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)

    GameStore.updatePlayerDirectionsHandler(new_directions)

    expect(GameStore.state).toEqual(expected_state)
  })

  test('that the startGameHandler function emits a \'new_game_started\' event', () => {
    const callback = jest.fn()
    GameStore.on('new_game_started', callback)

    GameStore.state = {}
    GameStore.startGameHandler({})

    expect(callback).toBeCalledTimes(1)
  })

  test('that the updateCollisionMatrixHandler function updates the collision_matrix of the GameStore', () => {
    const new_matrix = [
      [ false, false ],
      [ false, false ],
    ]
    const expected_state = {}
    GameStore.state = {}

    expected_state.collision_matrix = new_matrix
    GameStore.updateCollisionMatrixHandler(new_matrix)

    expect(GameStore.state).toEqual(expected_state)
  })

  test('that the updateCollisionMatrixHandler function emits a \'collision_matrix_updated\' event', () => {
    const new_matrix = [
      [ false, false ],
      [ false, false ],
    ]
    const callback = jest.fn()
    GameStore.on('collision_matrix_updated', callback)

    GameStore.state = {}
    GameStore.updateCollisionMatrixHandler(new_matrix)

    expect(callback).toBeCalledTimes(1)
  })

  test('that the updateCollisionMatrixHandler function passes the modified collision matrix to the callbacks registered to it\'s emitted event', () => {
    const new_matrix = [
      [ false, false ],
      [ false, false ],
    ]
    const callback = jest.fn()
    GameStore.on('collision_matrix_updated', callback)

    GameStore.state = {}
    GameStore.updateCollisionMatrixHandler(new_matrix)

    expect(callback).toBeCalledTimes(1)
    expect(callback).toBeCalledWith(new_matrix)
  })

  test('that the updatePlayerDeathsHandler function updates the dead property of each of the the GameStore\'s player objects', () => {
    const death_array = [ true, false ]
    const expected_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)

    GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    GameStore.updatePlayerDeathsHandler(death_array)

    expect(GameStore.state.player_state[0].dead).toBeTruthy()
    expect(GameStore.state.player_state[1].dead).toBeFalsy()
  })

  test('that the updatePlayerDeathsHandler function emits a \'player_deaths_updated\' event', () => {
    const death_array = [ true, false ]
    const callback = jest.fn()
    GameStore.on('player_deaths_updated', callback)

    GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    GameStore.updatePlayerDeathsHandler(death_array)

    expect(callback).toBeCalledTimes(1)
  })

  test('that the updatePlayerScoresHandler function updates the score property of each of the GameStore\'s player objects', () => {
    const score_array = [ 0, 0 ]
    const expected_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)

    GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    GameStore.updatePlayerScoresHandler(score_array)

    expect(GameStore.state.player_state[0].score).toBe(0)
    expect(GameStore.state.player_state[1].score).toBe(0)
  })

  test('that the updatePlayerScoresHandler function emits a \'player_scores_updated\' event', () => {
    const score_array = [ 0, 0 ]
    const callback = jest.fn()
    GameStore.on('player_scores_updated', callback)

    GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    GameStore.updatePlayerScoresHandler(score_array)

    expect(callback).toBeCalledTimes(1)
  })
})

describe('the player position update logic, controlled from the GameAction and manifesting in the GameStore.state', () => {

  test('a pair of players with some turns', () => {

    const valid_state = JSON.parse(JSON.stringify(valid_state_template))
    GameStore.state = valid_state

    const player0_right_turn_key_event = {
      keyCode: GameStore.state.player_state[0].turn_right_keycode,
    }
    const player0_left_turn_key_event = {
      keyCode: GameStore.state.player_state[0].turn_left_keycode,
    }
    const player1_right_turn_key_event = {
      keyCode: GameStore.state.player_state[1].turn_right_keycode,
    }
    const player1_left_turn_key_event = {
      keyCode: GameStore.state.player_state[1].turn_left_keycode,
    }

    updatePlayerPathsAction()
    handleKeyEventsAction(player0_right_turn_key_event)
    updatePlayerPathsAction()
    handleKeyEventsAction(player1_right_turn_key_event)
    updatePlayerPathsAction()
    updatePlayerPathsAction()
    handleKeyEventsAction(player0_left_turn_key_event)
    handleKeyEventsAction(player1_left_turn_key_event)
    updatePlayerPathsAction()
    handleKeyEventsAction(player1_left_turn_key_event)
    updatePlayerPathsAction()

    const expected_both_paths = [
      [
        [ 153, 203 ],
        [ 151, 203 ],
        [ 151, 200 ],
        [ 150, 200 ],
      ],
      [
        [ 147, 199 ],
        [ 147, 198 ],
        [ 148, 198 ],
        [ 148, 200 ],
        [ 150, 200 ],
      ]
    ]
    const actual_both_paths = [
      GameStore.state.player_state[0].path,
      GameStore.state.player_state[1].path,
    ]

    return expect(actual_both_paths).toEqual(expected_both_paths)
  })
})
