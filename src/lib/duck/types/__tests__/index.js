import * as ActionTypes from '../index.js'

describe('the available action types', () => {

  it('contains an update options type', () => {
    expect(ActionTypes.UPDATE_OPTIONS).toBe('UPDATE_OPTIONS')
  })

  it('contains an add player type', () => {
    expect(ActionTypes.ADD_PLAYER).toBe('ADD_PLAYER')
  })

  it('contains a remove player type', () => {
    expect(ActionTypes.REMOVE_PLAYER).toBe('REMOVE_PLAYER')
  })
})
