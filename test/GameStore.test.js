import GameStore from '../src/restructure/GameStore.js'

const valid_state_template = {
  field_width: 200,
  field_height: 200,
  matches: 1,
  player_state: [{
    path: [[ 150, 200 ]],
    direction: 0,
    turn_left_keycode: 65,
    turn_right_keycode: 68,
    colour: 'rgba(0,0,255, 0.5)',
  }]
}

beforeEach(() => {
  GameStore.state = undefined
})
test('true is true', () => {
  expect(true).toBeTruthy()
})

describe('the player position update logic', () => {

  test('a single player moving in a simple direction', () => {

    let valid_state = Object.assign({}, valid_state_template)
    GameStore.state = valid_state
    GameStore.movePlayers()

    return expect(valid_state.player_state[0].path).toEqual([[ 151, 200 ]])
  })
})
