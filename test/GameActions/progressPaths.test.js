import progressPaths from '../../src/restructure/GameActions/progressPaths.js'

describe('the progressing of a collection of paths with directions', () => {

  test('that a single path object is progressed', () => {
    const paths_input = {
      paths: [
        [
          [ 150, 150 ],
        ]
      ],
      directions: [ 0 ],
    }
    const expected_output = [
      [
        [ 151, 150 ],
      ]
    ]

    expect(progressPaths(paths_input)).toEqual(expected_output)
  })

  test('that multiple path objects are progressed', () => {
    const paths_input = {
      paths: [
        [
          [ 150, 150 ],
          [ 150, 150 ],
        ],
        [
          [ 150, 150 ],
          [ 150, 150 ],
        ],
      ],
      directions: [
        0,
        Math.PI,
      ]
    }
    const expected_output = [
      [
        [ 151, 150 ],
        [ 150, 150 ],
      ],
      [
        [ 149, 150 ],
        [ 150, 150 ],
      ],
    ]

    expect(progressPaths(paths_input)).toEqual(expected_output)
  })
})
