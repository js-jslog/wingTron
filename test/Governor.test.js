import Governor from '../src/restructure/Governor/Governor.js'
import OptionsStore from '../src/restructure/OptionsStore.js'

test('that the governor fails to start the game if there are no options', () => {
  OptionsStore.setOptions({});
  const governor = new Governor()
  return expect(governor.startGame()).toBeFalsy()
})

test('that governor can start game if the options are available', () => {
  OptionsStore.setOptions({
    field_width: '200',
    field_height: '200',
    matches: '10',
    player_options: [{
      start_coord_x: '200',
      start_coord_y: '200',
      direction: '0',
      turn_left_keycode: '65',
      turn_right_keycode: '68',
      colour: "rgba(0,0,255, 0.5)",
    }]
  })
  const governor = new Governor()
  return expect(governor.startGame()).toBeTruthy()
})
