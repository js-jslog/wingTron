// the DEATH function will determine from the collision matrix, who is now dead
// it will also determine who should die if the situation does not change soon. this will be more advanced functionality, and could work through promises back to the caller, or by putting a death timestamp on the players state..
import DEATH from '../../src/restructure/GameActions/DEATH.js'

describe('the simple judgements', () => {

  test('that an individual colliding in one or multiple places constitutes a single death', () => {

    const collision_matrix = [
      [ true, true, true, true, true, true, ],
      [ false, true, true, true, true, true, ],
      [ false, false, true, true, false, false, ],
      [ false, false, false, false, false, true, ],
      [ true, false, false, false, false, true, ],
      [ false, false, false, false, false, false, ],
    ]
    const expected_death_array = [ true, true, true, true, true, false ]
    const actual_death_array = DEATH(collision_matrix)

    expect(actual_death_array).toEqual(expected_death_array)
  })
})
