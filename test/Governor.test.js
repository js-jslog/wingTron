import Governor from '../src/restructure/Governor/Governor.js'
import OptionsStore from '../src/restructure/OptionsStore.js'

test('that the governor fails to start the game if there are no options', () => {
  OptionsStore.setOptions({});
  const governor = new Governor()
  return expect(governor.startGame()).not.toBeTruthy()
})

test('that governor can start game if the options are available', () => {
  OptionsStore.setOptions({
    field_width: '200',
    field_height: '200',
    matches: '10',
    player_options: ['a', 'a'],
  })
  const governor = new Governor()
  return expect(governor.startGame()).toBeTruthy()
})
