import reducePlayerPaths from '../../src/restructure/GameActions/reducePlayerPaths.js'
import { reducePlayerStates } from '../../src/restructure/GameActions/reducePlayerPaths.js'
import optionsToGameState from '../../src/restructure/GameActions/optionsToGameState.js'
import GameStore from '../../src/restructure/GameStore.js'
import OptionsStore from '../../src/restructure/OptionsStore.js'

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

describe('the player state reducer', () => {

  test('that the reducer works on paths', () => {
    const game_state = {
      player_state: [],
    }
    const sample_paths = [
      [
        [ 1, 2 ],
        [ 3, 4 ],
      ],
      [
        [ 5, 6 ],
        [ 7, 8 ],
      ],
    ]
    game_state.player_state.push({},{})
    game_state.player_state[0].path = sample_paths[0]
    game_state.player_state[1].path = sample_paths[1]

    expect(reducePlayerStates(game_state.player_state, 'path')).toEqual(sample_paths)
  })

  test('that the reducer works on directions', () => {
    const game_state = {
      player_state: [],
    }
    const sample_directions = [ 1, 2, 3, 4 ]
    game_state.player_state.push({},{},{},{})
    game_state.player_state[0].direction = sample_directions[0]
    game_state.player_state[1].direction = sample_directions[1]
    game_state.player_state[2].direction = sample_directions[2]
    game_state.player_state[3].direction = sample_directions[3]

    expect(reducePlayerStates(game_state.player_state, 'direction')).toEqual(sample_directions)
  })
})
