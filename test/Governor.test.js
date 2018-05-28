import Governor from '../src/restructure/Governor/Governor.js'
import OptionsStore from '../src/restructure/OptionsStore.js'
import GameStore from '../src/restructure/GameStore.js'

const valid_options = {
  field_width: '200',
  field_height: '200',
  matches: '10',
  player_options: [{
    start_coord_x: '150',
    start_coord_y: '100',
    direction: '0',
    turn_left_keycode: '65',
    turn_right_keycode: '68',
    colour: 'rgba(0,0,255, 0.5)',
  }]
}

const valid_converted_game_state = {
  field_width: 200,
  field_height: 200,
  matches: 10,
  player_state: [{
    path: [
      [ 150, 100 ],
      [ 150, 100 ],
    ],
    direction: 0,
    turn_left_keycode: 65,
    turn_right_keycode: 68,
    colour: 'rgba(0,0,255, 0.5)',
  }]
}

beforeEach(() => {
  OptionsStore.options = undefined
  GameStore.state = undefined
})

describe('the governors game setup', () => {

    test('that the governor fails to start the game if there are no options', () => {
        return expect(Governor.startGame()).toBeFalsy()
    })

    test('that governor can start game if the options are available', () => {
        OptionsStore.options = valid_options
        return expect(Governor.startGame()).toBeTruthy()
    })

    test('that governor creates a game store state', () => {
        OptionsStore.options = valid_options
        Governor.startGame()
        expect(GameStore.state).toEqual(valid_converted_game_state)
    })
})
