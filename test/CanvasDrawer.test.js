import CanvasDrawer from '../src/restructure/CanvasDrawer.js'
import GameStore from '../src/restructure/GameStore.js'

const ctx_mock = {}

const valid_state_template = {
  field_width: 200,
  field_height: 200,
  matches: 1,
  collision_matrix: [
    [ false, false ],
    [ false, false ],
  ],
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
  const valid_state = JSON.parse(JSON.stringify(valid_state_template))
  ctx_mock.fillRect = jest.fn()
  GameStore.state = valid_state
})

describe('the field drawing logic', () => {

  test('a call on the 2d context was made', () => {

    CanvasDrawer.drawField(ctx_mock)

    expect(ctx_mock.fillRect.mock.calls.length).toBe(1)
  })

  test('a field of the correct size is drawn on a 2d context', () => {
    CanvasDrawer.drawField(ctx_mock)

    expect(ctx_mock.fillRect.mock.calls[0][0]).toBe(0)
    expect(ctx_mock.fillRect.mock.calls[0][1]).toBe(0)
    expect(ctx_mock.fillRect.mock.calls[0][2]).toBe(200)
    expect(ctx_mock.fillRect.mock.calls[0][3]).toBe(200)
  })
})
