import OptionsStore from '../../src/restructure/OptionsStore.js'
import calculateCollisionMatrix from '../../src/restructure/GameActions/calculateCollisionMatrix.js'
import optionsToGameState from '../../src/restructure/GameActions/optionsToGameState.js'
import reducePlayerPaths from '../../src/restructure/GameActions/reducePlayerPaths.js'

describe('the collision detection positive results', () => {

  test('that the collision flag is set when a player runs in to their own anchor line', () => {
    const self_collide_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    const self_collision_path = [
      [ 90, 90 ],
      [ 90, 100 ],
      [ 100, 100 ],
      [ 100, 0 ],
      [ 0, 0 ],
    ]
    const expected_collision_matrix = [
      [ true ],
    ]
    self_collide_state.player_state.splice(1, 1)
    self_collide_state.player_state[0].path = self_collision_path

    const paths = reducePlayerPaths(self_collide_state)
    // TODO: add this further slimming to the reducePlayerPaths library
    const further_reduced_paths = paths.map(obj => obj.path)

    expect(calculateCollisionMatrix(further_reduced_paths)).toEqual(expected_collision_matrix)
  })

  test('that the collision flag is set for multiple players inside a single players area', () => {
    const collided_paths = [
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 50, 50 ],
      ],
      [
        [ 1, 1 ],
      ],
      [
        [ 99, 1 ],
      ],
      [
        [ 99, 99 ],
      ],
      [
        [ 1, 99 ],
      ],
    ]
    const collided_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    const expected_collision_matrix = [
      [false, false, false, false, false, false],
      [true, false, false, false, false, false],
      [true, false, false, false, false, false],
      [true, false, false, false, false, false],
      [true, false, false, false, false, false],
      [true, false, false, false, false, false],
    ]
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))

    collided_state.player_state[0].path = collided_paths[0]
    collided_state.player_state[1].path = collided_paths[1]
    collided_state.player_state[2].path = collided_paths[2]
    collided_state.player_state[3].path = collided_paths[3]
    collided_state.player_state[4].path = collided_paths[4]
    collided_state.player_state[5].path = collided_paths[5]

    const paths = reducePlayerPaths(collided_state)
    // TODO: add this further slimming to the reducePlayerPaths library
    const further_reduced_paths = paths.map(obj => obj.path)

    expect(calculateCollisionMatrix(further_reduced_paths)).toEqual(expected_collision_matrix)
  })

  test('that the collision flag is set for a single player inside multiple players areas', () => {
    const collided_paths = [
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 50, 50 ],
      ],
    ]
    const collided_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    const expected_collision_matrix = [
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [true, true, true, true, true, false],
    ]
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))
    collided_state.player_state.push(JSON.parse(JSON.stringify(collided_state.player_state[0])))

    collided_state.player_state[0].path = collided_paths[0]
    collided_state.player_state[1].path = collided_paths[1]
    collided_state.player_state[2].path = collided_paths[2]
    collided_state.player_state[3].path = collided_paths[3]
    collided_state.player_state[4].path = collided_paths[4]
    collided_state.player_state[5].path = collided_paths[5]

    const paths = reducePlayerPaths(collided_state)
    // TODO: add this further slimming to the reducePlayerPaths library
    const further_reduced_paths = paths.map(obj => obj.path)

    expect(calculateCollisionMatrix(further_reduced_paths)).toEqual(expected_collision_matrix)
  })
})

describe('the collision detection negative results', () => {

  test('that interaction along the path itself does not count as a collision', () => {
    const non_collided_paths = [
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 100, 0 ],
      ],
      [
        [ 100, 50 ],
      ],
      [
        [ 50, 100 ],
      ],
      [
        [ 0, 0 ],
      ],
      [
        [ 0, 20 ],
      ],
    ]
    const non_collided_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    const expected_collision_matrix = [
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
    ]
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))

    non_collided_state.player_state[0].path = non_collided_paths[0]
    non_collided_state.player_state[1].path = non_collided_paths[1]
    non_collided_state.player_state[2].path = non_collided_paths[2]
    non_collided_state.player_state[3].path = non_collided_paths[3]
    non_collided_state.player_state[4].path = non_collided_paths[4]
    non_collided_state.player_state[5].path = non_collided_paths[5]

    const paths = reducePlayerPaths(non_collided_state)
    // TODO: add this further slimming to the reducePlayerPaths library
    const further_reduced_paths = paths.map(obj => obj.path)

    expect(calculateCollisionMatrix(further_reduced_paths)).toEqual(expected_collision_matrix)
  })

  test('that an individual previously inside an area is not recognised as collided if they are now outside', () => {
    const non_collided_paths = [
      [
        [ 0, 0 ],
        [ 100, 0 ],
        [ 100, 100 ],
        [ 0, 100 ],
      ],
      [
        [ 100, 0 ],
        [ 50, 50 ],
      ],
      [
        [ 100, 50 ],
        [ 50, 50 ],
      ],
      [
        [ 50, 100 ],
        [ 50, 50 ],
      ],
      [
        [ 0, 0 ],
        [ 50, 50 ],
      ],
      [
        [ 0, 20 ],
        [ 50, 50 ],
      ],
    ]
    const non_collided_state = optionsToGameState(OptionsStore.DEFAULT_OPTIONS)
    const expected_collision_matrix = [
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
    ]
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))
    non_collided_state.player_state.push(JSON.parse(JSON.stringify(non_collided_state.player_state[0])))

    non_collided_state.player_state[0].path = non_collided_paths[0]
    non_collided_state.player_state[1].path = non_collided_paths[1]
    non_collided_state.player_state[2].path = non_collided_paths[2]
    non_collided_state.player_state[3].path = non_collided_paths[3]
    non_collided_state.player_state[4].path = non_collided_paths[4]
    non_collided_state.player_state[5].path = non_collided_paths[5]

    const paths = reducePlayerPaths(non_collided_state)
    // TODO: add this further slimming to the reducePlayerPaths library
    const further_reduced_paths = paths.map(obj => obj.path)

    expect(calculateCollisionMatrix(further_reduced_paths)).toEqual(expected_collision_matrix)
  })
})
