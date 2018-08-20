import { EventEmitter } from 'events'
import dispatcher from '../lib/dispatcher.js'

class OptionsStore extends EventEmitter {
  DEFAULT_OPTIONS = {
    field_width: '200',
    field_height: '200',
    matches: '10',
    player_options: [
      {
        start_coord_x: '150',
        start_coord_y: '100',
        direction: '0',
        turn_left_keycode: '37',
        turn_right_keycode: '39',
        colour: 'rgba(255,0,0, 0.5)',
      },
      {
        start_coord_x: '150',
        start_coord_y: '100',
        direction: '' + Math.PI,
        turn_left_keycode: '65',
        turn_right_keycode: '68',
        colour: 'rgba(0,0,255, 0.5)',
      },
    ]
  }

  options = undefined

  updateOptionsHandler(options) {

    this.options = JSON.parse(JSON.stringify(options))
    this.emit('change')
  }

  handleActions(action) {
    switch(action.type) {
      case 'UPDATE_OPTIONS':
        this.updateOptionsHandler(action.options)
        break
    }
  }
}

const OptionsStoreInstance = new OptionsStore
dispatcher.register(OptionsStoreInstance.handleActions.bind(OptionsStoreInstance))

export default OptionsStoreInstance
