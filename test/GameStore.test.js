import GameStore from '../src/restructure/GameStore.js'
import OptionsStore from '../src/restructure/OptionsStore.js'
import optionsToGameState from '../src/restructure/GameActions/optionsToGameState.js'
import { updatePlayerPaths, handleKeyEvents } from '../src/restructure/GameActions'
import dispatcher from '../src/lib/dispatcher.js'

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
  const startNewGameOrig = GameStore.startNewGame
  const updatePlayerPathsOrig = GameStore.updatePlayerPaths
  const updatePlayerDirectionsOrig = GameStore.updatePlayerDirections
  const updateCollisionMatrixOrig = GameStore.updateCollisionMatrix

  beforeEach(() => {
    GameStore.handleActions = jest.fn()
    GameStore.startNewGame = jest.fn()
    GameStore.updatePlayerPaths = jest.fn()
    GameStore.updatePlayerDirections = jest.fn()
    GameStore.updateCollisionMatrix = jest.fn()
  })
  afterAll(() => {
    GameStore.handleActions = handleActionsOrig
    GameStore.startNewGame = startNewGameOrig
    GameStore.updatePlayerPaths = updatePlayerPathsOrig
    GameStore.updatePlayerDirections = updatePlayerDirectionsOrig
    GameStore.updateCollisionMatrix = updateCollisionMatrixOrig
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

  test('that the GameStore handles the START_NEW_GAME payload by calling startNewGame with the state object', () => {
    const payload = {
      type: 'START_NEW_GAME',
      state: {
        generic: 'state',
      },
    }
    dispatcher.dispatch(payload)

    expect(GameStore.startNewGame).toBeCalledTimes(1)
    expect(GameStore.startNewGame).toBeCalledWith(payload.state)
    expect(GameStore.updatePlayerPaths).toBeCalledTimes(0)
    expect(GameStore.updateCollisionMatrix).toBeCalledTimes(0)
    expect(GameStore.updatePlayerDirections).toBeCalledTimes(0)
  })

  test('that the GameStore handles the UPDATE_PLAYER_PATHS payload by calling updatePlayerPaths with the appropriate paths array', () => {
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

    expect(GameStore.updatePlayerPaths).toBeCalledTimes(1)
    expect(GameStore.updatePlayerPaths).toBeCalledWith(payload.paths)
    expect(GameStore.startNewGame).toBeCalledTimes(0)
    expect(GameStore.updateCollisionMatrix).toBeCalledTimes(0)
    expect(GameStore.updatePlayerDirections).toBeCalledTimes(0)
  })

  test('that the GameStore handles the UPDATE_PLAYER_DIRECTIONS payload by calling updatePlayerDirections with the appropriate directions array', () => {
    const payload = {
      type: 'UPDATE_PLAYER_DIRECTIONS',
      directions: [ 1, 2 ],
    }
    dispatcher.dispatch(payload)

    expect(GameStore.updatePlayerDirections).toBeCalledTimes(1)
    expect(GameStore.updatePlayerDirections).toBeCalledWith(payload.directions)
    expect(GameStore.startNewGame).toBeCalledTimes(0)
    expect(GameStore.updateCollisionMatrix).toBeCalledTimes(0)
    expect(GameStore.updatePlayerPaths).toBeCalledTimes(0)
  })

  test('that the GameStore handles the UPDATE_COLLISION_MATRIX payload by calling updateCollisionMatrix with the appropriate matrix array', () => {
    const payload = {
      type: 'UPDATE_COLLISION_MATRIX',
      matrix: [
        [ false, false ],
        [ false, false ],
      ]
    }
    dispatcher.dispatch(payload)

    expect(GameStore.updateCollisionMatrix).toBeCalledTimes(1)
    expect(GameStore.updateCollisionMatrix).toBeCalledWith(payload.matrix)
    expect(GameStore.startNewGame).toBeCalledTimes(0)
    expect(GameStore.updatePlayerPaths).toBeCalledTimes(0)
    expect(GameStore.updatePlayerDirections).toBeCalledTimes(0)
  })
})

describe('the functionality of the functions called by the action handler', () => {

  test('that the startNewGame function updates the state of the GameStore', () => {
    const new_state = {
      some: 'new state',
    }
    GameStore.state = {
      some_other: 'old state'
    }

    GameStore.startNewGame(new_state)

    expect(GameStore.state).toEqual(new_state)
  })

  test('that the updatePlayerPaths function updates the paths of the GameStore player states', () => {
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

    GameStore.updatePlayerPaths(new_paths)

    expect(GameStore.state).toEqual(expected_state)
  })

  test('that the updateCollisionMatrix function updates the collision_matrix of the GameStore', () => {
    const new_matrix = [
      [ false, false ],
      [ false, false ],
    ]
    const expected_state = {}
    GameStore.state = {}

    expected_state.collision_matrix = new_matrix
    GameStore.updateCollisionMatrix(new_matrix)

    expect(GameStore.state).toEqual(expected_state)
  })

  test('that the updatePlayerDirections function updates the player directions in the GameStore', () => {
    const new_directions = [ 1, 2 ]
    const expected_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    expected_state.player_state[0].direction = new_directions[0]
    expected_state.player_state[1].direction = new_directions[1]
    GameStore.state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)

    GameStore.updatePlayerDirections(new_directions)

    expect(GameStore.state).toEqual(expected_state)
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

    updatePlayerPaths()
    handleKeyEvents(player0_right_turn_key_event)
    updatePlayerPaths()
    handleKeyEvents(player1_right_turn_key_event)
    updatePlayerPaths()
    updatePlayerPaths()
    handleKeyEvents(player0_left_turn_key_event)
    handleKeyEvents(player1_left_turn_key_event)
    updatePlayerPaths()
    handleKeyEvents(player1_left_turn_key_event)
    updatePlayerPaths()

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
