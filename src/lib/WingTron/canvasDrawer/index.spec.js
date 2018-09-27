// @flow

import { drawField } from './'
import { drawPlayers } from './'
import { drawPaths } from './'


describe('the functionality of a canvas drawer', () => {

  it('should present a function for drawing the field, the players and the paths', () => {

    expect(drawField).toBeTruthy();
    expect(drawPlayers).toBeTruthy();
    expect(drawPaths).toBeTruthy();
  })
})

