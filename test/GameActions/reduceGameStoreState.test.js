import { reducePlayerStates } from '~/GameActions/reduceGameStoreState.js'
import optionsToGameState from '~/GameActions/optionsToGameState.js'
import GameStore from '~/GameStore.js'
import OptionsStore from '~/OptionsStore.js'

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

  test('that the reducer doesnt effect the input object itself', () => {
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

    const reducedPaths = reducePlayerStates(game_state.player_state, 'path')
    reducedPaths[0].push([10, 11])

    expect(reducedPaths).not.toEqual(reducePlayerStates(game_state.player_state, 'path'))
  })
})
