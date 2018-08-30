import dispatcher from '~/dispatcher'
import OptionsStore from '~/OptionsStore.js'
import { validateOptions } from '~/GameActions/validateOptions.js'
// TODO: should validateOptions exist in a generic helper folder rather than in GameActions if it is used elsewhere

export function updateOptionsAction(options) {

  if (validateOptions(options)) {
    dispatcher.dispatch({
      type: 'UPDATE_OPTIONS',
      options: options,
    })
  }
}

export function addPlayerAction() {
  const options = JSON.parse(JSON.stringify(OptionsStore.options))
  const new_player = JSON.parse(JSON.stringify(OptionsStore.DEFAULT_OPTIONS.player_options[0]))
  options.player_options.push(new_player)

  dispatcher.dispatch({
    type: 'UPDATE_OPTIONS',
    options: options,
  })
}

export function removePlayerAction(index) {
  const options = JSON.parse(JSON.stringify(OptionsStore.options))
  options.player_options.splice(index, 1)

  dispatcher.dispatch({
    type: 'UPDATE_OPTIONS',
    options: options,
  })
}
