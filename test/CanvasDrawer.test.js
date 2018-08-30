import { drawField, drawPaths, drawPlayers } from '../src/lib/CanvasDrawer.js'
import GameStore from '../src/lib/GameStore.js'

const ctx_mock = {}
const colour_record = {
  fillStyle: [],
  strokeStyle: [],
}
const record_ctx_mock_colour = function (ctx_obj) {
  colour_record.fillStyle.push(this.fillStyle)
  colour_record.strokeStyle.push(this.strokeStyle)
}

const valid_state_template = {
  field_width: 200,
  field_height: 100,
  matches: 1,
  player_state: [
    {
      path: [
        [ 100, 150 ],
        [ 100, 150 ],
      ],
      direction: 0,
      turn_left_keycode: 37,
      turn_right_keycode: 39,
      colour: 'rgba(0,0,255, 0.5)',
    },
    {
      path: [
        [ 200, 250 ],
        [ 200, 250 ],
      ],
      direction: Math.PI,
      turn_left_keycode: 65,
      turn_right_keycode: 68,
      colour: 'rgba(255,0,0, 0.5)',
    },
  ]
} 

beforeEach(() => {
  const valid_state = JSON.parse(JSON.stringify(valid_state_template))
  colour_record.fillStyle = []
  colour_record.strokeStyle = []
  ctx_mock.fillRect = jest.fn(record_ctx_mock_colour)
  ctx_mock.fill = jest.fn(record_ctx_mock_colour)
  GameStore.state = valid_state
})

describe('the field drawing logic', () => {

  test('a call on the 2d context was made', () => {

    drawField(ctx_mock)

    expect(ctx_mock.fillRect.mock.calls.length).toBe(1)
  })

  test('a field of the correct size is drawn on a 2d context', () => {
    drawField(ctx_mock)

    expect(ctx_mock.fillRect.mock.calls[0][0]).toBe(0)
    expect(ctx_mock.fillRect.mock.calls[0][1]).toBe(0)
    expect(ctx_mock.fillRect.mock.calls[0][2]).toBe(200)
    expect(ctx_mock.fillRect.mock.calls[0][3]).toBe(100)

    expect(colour_record.fillStyle[0]).toBe("#000")
    expect(colour_record.strokeStyle[0]).toBe("#000")
  })
})

describe('the player drawing logic', () => {

  test('that a square is rendered once per player', () => {
    drawPlayers(ctx_mock)

    expect(ctx_mock.fillRect.mock.calls.length).toBe(2)
  })

  test('that the players are drawn in the correct position', () => {
    const presumed_size = 3
    const offset = (presumed_size -1) /2

    drawPlayers(ctx_mock)

    expect(ctx_mock.fillRect.mock.calls[0][0]).toBe(100 - offset)
    expect(ctx_mock.fillRect.mock.calls[0][1]).toBe(150 - offset)
    expect(ctx_mock.fillRect.mock.calls[0][2]).toBe(presumed_size)
    expect(ctx_mock.fillRect.mock.calls[0][3]).toBe(presumed_size)

    expect(ctx_mock.fillRect.mock.calls[1][0]).toBe(200 - offset)
    expect(ctx_mock.fillRect.mock.calls[1][1]).toBe(250 - offset)
    expect(ctx_mock.fillRect.mock.calls[1][2]).toBe(presumed_size)
    expect(ctx_mock.fillRect.mock.calls[1][3]).toBe(presumed_size)

    expect(colour_record.fillStyle[0]).toBe('rgba(0,0,255, 0.5)')
    expect(colour_record.strokeStyle[0]).toBe('rgba(0,0,255, 0.5)')
    expect(colour_record.fillStyle[1]).toBe('rgba(255,0,0, 0.5)')
    expect(colour_record.strokeStyle[1]).toBe('rgba(255,0,0, 0.5)')
  })
})

describe('the path drawing logic', () => {

  test('that a polygon is rendered once per player', () => {

    drawPaths(ctx_mock)

    expect(ctx_mock.fill.mock.calls.length).toBe(2)

    expect(colour_record.fillStyle[0]).toBe('rgba(0,0,255, 0.5)')
    expect(colour_record.strokeStyle[0]).toBe('rgba(0,0,255, 0.5)')
    expect(colour_record.fillStyle[1]).toBe('rgba(255,0,0, 0.5)')
    expect(colour_record.strokeStyle[1]).toBe('rgba(255,0,0, 0.5)')
  })
})
