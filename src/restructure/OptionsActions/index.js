import dispatcher from '../../lib/dispatcher'
import OptionsStore from '../../restructure/OptionsStore.js'
import { validateOptions } from '../../restructure/GameActions/validateOptions.js'

export function updateOptions(options) {

  if (validateOptions(options)) {
    dispatcher.dispatch({
      type: 'UPDATE_OPTIONS',
      options: options,
    })
  }
}
