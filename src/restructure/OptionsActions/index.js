import dispatcher from '../../lib/dispatcher'
import OptionsStore from '../../restructure/OptionsStore.js'
import { validateOptions } from '../../restructure/GameActions/validateOptions.js'

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
