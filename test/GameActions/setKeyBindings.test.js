import setKeyBindings from '../../src/restructure/GameActions/setKeyBindings.js'
import { handleKeyEvents } from '../../src/restructure/GameActions'

describe('the behaviour relating to binding key presses to game manipulation', () => {

  const document = {}
  document.removeEventListener = jest.fn()
  document.addEventListener = jest.fn()


  test('that the function removes the handleKeyEvents function before adding them again', () => {

    setKeyBindings(document)

    expect(document.removeEventListener.mock.invocationCallOrder).toEqual([1,2])
    expect(document.addEventListener.mock.invocationCallOrder).toEqual([3,4])
  })

  test('that it is the handleKeyEvents which is being added & removed for both the keydown & keyup events', () => {

    setKeyBindings(document)
    expect(document.removeEventListener).toHaveBeenCalledWith('keydown', handleKeyEvents)
    expect(document.removeEventListener).toHaveBeenCalledWith('keyup', handleKeyEvents)
    expect(document.addEventListener).toHaveBeenCalledWith('keydown', handleKeyEvents)
    expect(document.addEventListener).toHaveBeenCalledWith('keyup', handleKeyEvents)
  })
})
    
