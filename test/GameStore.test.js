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
      turn_left_keycode: 65,
      turn_right_keycode: 68,
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
      valid_state.player_state[0].path,
      valid_state.player_state[1].path,
    ]

    return expect(actual_both_paths).toEqual(expected_both_paths)
  })
})
