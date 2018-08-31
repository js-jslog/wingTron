import * as ActionTypes from '../'

describe('the available action types', () => {

  it('contains an update options type', () => {
    expect(ActionTypes.UPDATE_OPTIONS).toBe('UPDATE_OPTIONS')
  })

  it('contains an add player type', () => {
    expect(ActionTypes.ADD_PLAYER_TO_OPTIONS).toBe('ADD_PLAYER_TO_OPTIONS')
  })

  it('contains a remove player type', () => {
    expect(ActionTypes.REMOVE_PLAYER_FROM_OPTIONS).toBe('REMOVE_PLAYER_FROM_OPTIONS')
  })
})
