import progressPaths from '../src/restructure/GameActions/progressPaths.js'

describe('the progressing of a collection of paths with directions', () => {

  test('that a single path object is progressed', () => {
    const paths_input = [
      {
        direction: 0,
        path: [
          [ 150, 150 ],
        ],
      },
    ]
    const expected_output = [
      {
        direction: 0,
        path: [
          [ 151, 150 ],
        ],
      },
    ]

    expect(progressPaths(paths_input)).toEqual(expected_output)
  })

  test('that multiple path objects are progressed', () => {
    const paths_input = [
      {
        direction: 0,
        path: [
          [ 150, 150 ],
          [ 150, 150 ],
        ],
      },
      {
        direction: Math.PI,
        path: [
          [ 150, 150 ],
          [ 150, 150 ],
        ],
      },
    ]
    const expected_output = [
      {
        direction: 0,
        path: [
          [ 151, 150 ],
          [ 150, 150 ],
        ],
      },
      {
        direction: Math.PI,
        path: [
          [ 149, 150 ],
          [ 150, 150 ],
        ],
      },
    ]

    expect(progressPaths(paths_input)).toEqual(expected_output)
  })
})
