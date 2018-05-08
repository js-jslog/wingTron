import { EventEmitter } from 'events';
import dispatcher from './dispatcher.js';

class OptionsStore extends EventEmitter {
  constructor() {
    super();
    this.options = {
      gameOptions: {
        fieldWidth: "300", fieldHeight: "300", matches: "10",
      },
      playerOptions: [
        {"startCoord": [150,150], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}, "colour": "rgba(255,0,0,0.5)",},
        {"startCoord": [150,150], "direction": Math.PI, "keyCodes": {"leftCode": 65, "rightCode": 68}, "colour": "rgba(0,0,255,0.5)",},
      ],
      environmentOptions: {},
    };
  }

  updateOptions(options) {
    this.options.gameOptions.fieldWidth = options.fieldWidth;
    this.options.gameOptions.fieldHeight = options.fieldHeight;
    this.options.gameOptions.matches = options.matches;

    this.emit('change');
  }

  getAll() {
    return this.options;
  }

  handleActions(action) {
    switch(action.type) {
      case 'UPDATE_OPTIONS': {
        this.updateOptions(action.options);
      }
    }
  }
}

const optionsStore = new OptionsStore;
dispatcher.register(optionsStore.handleActions.bind(optionsStore));

export default optionsStore;
