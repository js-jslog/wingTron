import { INITIAL_STATE } from '../'

describe('the exported constants', () => {

  test('that the initial state object is exported', () => {

    const expected_obj = {
      field_width: '200',
      field_height: '200',
      matches: '10'
    }

    expect(INITIAL_STATE).toEqual(expected_obj)
  })
})
