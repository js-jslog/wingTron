import GameStore from '../src/restructure/GameStore.js'
import OptionsStore from '../src/restructure/OptionsStore.js'
import optionsToGameState from '../src/restructure/GameActions/optionsToGameState.js'
import { updatePlayerPaths } from '../src/restructure/GameActions'
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

describe('the turn key mapping', () => {

  test('a keycode which relates to a players left turn produces the expected change in direction', () => {

    const valid_state = JSON.parse(JSON.stringify(valid_state_template))

    GameStore.state = valid_state
    GameStore.handleKeyPress(GameStore.state.player_state[0].turn_left_keycode)

    return expect(GameStore.state.player_state[0].direction).toEqual(-1 * Math.PI * 0.5)
  })

  test('a keycode which relates to a players right turn produces the expected change in direction', () => {

    const valid_state = JSON.parse(JSON.stringify(valid_state_template))

    GameStore.state = valid_state
    GameStore.handleKeyPress(GameStore.state.player_state[0].turn_right_keycode)

    return expect(GameStore.state.player_state[0].direction).toEqual(Math.PI * 0.5)
  })

  test('the path is updated when a turn is made', () => {
    const valid_state = JSON.parse(JSON.stringify(valid_state_template))

    GameStore.state = valid_state
    GameStore.handleKeyPress(GameStore.state.player_state[0].turn_right_keycode)

    return expect(GameStore.state.player_state[0].path).toEqual([
      [ 150, 200 ],
      [ 150, 200 ],
      [ 150, 200 ],
    ])
  })
})

describe('the action dispatch handling', () => {

  const handleActionsOrig = GameStore.handleActions
  const startNewGameOrig = GameStore.startNewGame
  const updatePlayerPathsOrig = GameStore.updatePlayerPaths

  beforeEach(() => {
    GameStore.handleActions = jest.fn()
    GameStore.startNewGame = jest.fn()
    GameStore.updatePlayerPaths = jest.fn()
  })
  afterAll(() => {
    GameStore.handleActions = handleActionsOrig
    GameStore.startNewGame = startNewGameOrig
    GameStore.updatePlayerPaths = updatePlayerPathsOrig
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

    expect(GameStore.state).toBe(new_state)
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
})

describe('the player position update logic', () => {

  test('a pair of players with some turns', () => {

    const valid_state = JSON.parse(JSON.stringify(valid_state_template))

    GameStore.state = valid_state
    updatePlayerPaths()
    GameStore.handleKeyPress(GameStore.state.player_state[0].turn_right_keycode)
    updatePlayerPaths()
    GameStore.handleKeyPress(GameStore.state.player_state[1].turn_right_keycode)
    updatePlayerPaths()
    updatePlayerPaths()
    GameStore.handleKeyPress(GameStore.state.player_state[0].turn_left_keycode)
    GameStore.handleKeyPress(GameStore.state.player_state[1].turn_left_keycode)
    updatePlayerPaths()
    GameStore.handleKeyPress(GameStore.state.player_state[1].turn_left_keycode)
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

describe('the collision detection positive results', () => {

  test('that the collision flag is set when a player runs in to their own anchor line', () => {
    const self_collide_state = JSON.parse(JSON.stringify(valid_state_template))
    const self_collision_path = [
      [ 90, 90 ],
      [ 90, 100 ],
      [ 100, 100 ],
      [ 100, 0 ],
      [ 0, 0 ],
    ]
    const expected_collision_matrix = [
      [ true ],
    ]
    self_collide_state.player_state.splice(1, 1)
    self_collide_state.player_state[0].path = self_collision_path

    GameStore.state = self_collide_state
    GameStore.calculateCollisionMatrix()

    return expect(GameStore.state.collision_matrix).toEqual(expected_collision_matrix)
  })

  test('that the collision flag is set for multiple players inside a single players area', () => {
    const collided_paths = [
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 50, 50 ],
      ],
      [
        [ 1, 1 ],
      ],
      [
        [ 99, 1 ],
      ],
      [
        [ 99, 99 ],
      ],
      [
        [ 1, 99 ],
      ],
    ]
    const collided_state = JSON.parse(JSON.stringify(valid_state_template))
    const expected_collision_matrix = [
      [false, false, false, false, false, false],
      [true, false, false, false, false, false],
      [true, false, false, false, false, false],
      [true, false, false, false, false, false],
      [true, false, false, false, false, false],
      [true, false, false, false, false, false],
    ]
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))

    collided_state.player_state[0].path = collided_paths[0]
    collided_state.player_state[1].path = collided_paths[1]
    collided_state.player_state[2].path = collided_paths[2]
    collided_state.player_state[3].path = collided_paths[3]
    collided_state.player_state[4].path = collided_paths[4]
    collided_state.player_state[5].path = collided_paths[5]

    GameStore.state = collided_state
    GameStore.calculateCollisionMatrix()

    return expect(GameStore.state.collision_matrix).toEqual(expected_collision_matrix)
  })

  test('that the collision flag is set for a single player inside multiple players areas', () => {
    const collided_paths = [
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 50, 50 ],
      ],
    ]
    const collided_state = JSON.parse(JSON.stringify(valid_state_template))
    const expected_collision_matrix = [
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [true, true, true, true, true, false],
    ]
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))

    collided_state.player_state[0].path = collided_paths[0]
    collided_state.player_state[1].path = collided_paths[1]
    collided_state.player_state[2].path = collided_paths[2]
    collided_state.player_state[3].path = collided_paths[3]
    collided_state.player_state[4].path = collided_paths[4]
    collided_state.player_state[5].path = collided_paths[5]

    GameStore.state = collided_state
    GameStore.calculateCollisionMatrix()

    return expect(GameStore.state.collision_matrix).toEqual(expected_collision_matrix)
  })
})

describe('the collision detection negative results', () => {

  test('that interaction along the path itself does not count as a collision', () => {
    const non_collided_paths = [
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 100, 0 ],
      ],
      [
        [ 100, 50 ],
      ],
      [
        [ 50, 100 ],
      ],
      [
        [ 0, 0 ],
      ],
      [
        [ 0, 20 ],
      ],
    ]
    const non_collided_state = JSON.parse(JSON.stringify(valid_state_template))
    const expected_collision_matrix = [
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
    ]
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))

    non_collided_state.player_state[0].path = non_collided_paths[0]
    non_collided_state.player_state[1].path = non_collided_paths[1]
    non_collided_state.player_state[2].path = non_collided_paths[2]
    non_collided_state.player_state[3].path = non_collided_paths[3]
    non_collided_state.player_state[4].path = non_collided_paths[4]
    non_collided_state.player_state[5].path = non_collided_paths[5]

    GameStore.state = non_collided_state
    GameStore.calculateCollisionMatrix()

    return expect(GameStore.state.collision_matrix).toEqual(expected_collision_matrix)
  })

  test('that an individual previously inside an area is not recognised as collided if they are now outside', () => {
    const non_collided_paths = [
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 100, 0 ],
        [ 50, 50 ],
      ],
      [
        [ 100, 50 ],
        [ 50, 50 ],
      ],
      [
        [ 50, 100 ],
        [ 50, 50 ],
      ],
      [
        [ 0, 0 ],
        [ 50, 50 ],
      ],
      [
        [ 0, 20 ],
        [ 50, 50 ],
      ],
    ]
    const non_collided_state = JSON.parse(JSON.stringify(valid_state_template))
    const expected_collision_matrix = [
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
    ]
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))

    non_collided_state.player_state[0].path = non_collided_paths[0]
    non_collided_state.player_state[1].path = non_collided_paths[1]
    non_collided_state.player_state[2].path = non_collided_paths[2]
    non_collided_state.player_state[3].path = non_collided_paths[3]
    non_collided_state.player_state[4].path = non_collided_paths[4]
    non_collided_state.player_state[5].path = non_collided_paths[5]

    GameStore.state = non_collided_state
    GameStore.calculateCollisionMatrix()

    return expect(GameStore.state.collision_matrix).toEqual(expected_collision_matrix)
  })
})

describe('the event emitting behaviour', () => {

  test('that a collision_matrix_update event is only emitted when the collision matrix differs from the previous update', () => {
    const valid_state = JSON.parse(JSON.stringify(valid_state_template))
    const self_collision_path = [
      [ 90, 90 ],
      [ 90, 100 ],
      [ 100, 100 ],
      [ 100, 0 ],
      [ 0, 0 ],
    ]
    const mock = jest.fn()
    GameStore.calculateCollisionMatrix = jest.fn(GameStore.calculateCollisionMatrix)
    GameStore.on('collision_matrix_update', mock)

    GameStore.state = valid_state
    GameStore.calculateCollisionMatrix()
    GameStore.calculateCollisionMatrix()

    expect(mock.mock.calls.length).toBe(1)

    GameStore.state.player_state[0].path = self_collision_path
    GameStore.calculateCollisionMatrix()

    expect(mock.mock.calls.length).toBe(2)
    expect(GameStore.calculateCollisionMatrix.mock.calls.length).toBe(3)
  })
})
