import GameStore from '../src/restructure/GameStore.js'

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


describe('the player position update logic', () => {

  test('a pair of players moving away from one another', () => {

    const valid_state = JSON.parse(JSON.stringify(valid_state_template))

    GameStore.state = valid_state
    GameStore.movePlayers()

    const expected_both_paths = [
      [
        [ 151, 200 ],
        [ 150, 200 ],
      ],
      [
        [ 149, 200 ],
        [ 150, 200 ],
      ]
    ]
    const actual_both_paths = [
      GameStore.state.player_state[0].path,
      GameStore.state.player_state[1].path,
    ]

    return expect(actual_both_paths).toEqual(expected_both_paths)
  })

  test('a pair of players with some turns', () => {

    const valid_state = JSON.parse(JSON.stringify(valid_state_template))

    GameStore.state = valid_state
    GameStore.movePlayers()
    GameStore.handleKeyPress(GameStore.state.player_state[0].turn_right_keycode)
    GameStore.movePlayers()
    GameStore.handleKeyPress(GameStore.state.player_state[1].turn_right_keycode)
    GameStore.movePlayers()
    GameStore.movePlayers()
    GameStore.handleKeyPress(GameStore.state.player_state[0].turn_left_keycode)
    GameStore.handleKeyPress(GameStore.state.player_state[1].turn_left_keycode)
    GameStore.movePlayers()
    GameStore.handleKeyPress(GameStore.state.player_state[1].turn_left_keycode)
    GameStore.movePlayers()

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
