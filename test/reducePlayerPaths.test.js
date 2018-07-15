import reducePlayerPaths from '../src/restructure/GameActions/reducePlayerPaths.js'
import optionsToGameState from '../src/restructure/GameActions/optionsToGameState.js'
import GameStore from '../src/restructure/GameStore.js'
import OptionsStore from '../src/restructure/OptionsStore.js'

describe('the functionality to reduce a paths object from a complete GameStore state object', () => {

  test('that a reduced copy of the input state object is returned', () => {
    const expected_output = [
      {
        path: [
          [150, 100 ],
          [150, 100 ],
        ],
        direction: 0,
      },
      {
        path: [
          [150, 100 ],
          [150, 100 ],
        ],
        direction: Math.PI,
      },
    ]
    const game_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)

    expect(reducePlayerPaths(game_state)).toEqual(expected_output)
  })
})
