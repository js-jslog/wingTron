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
    this.options = options;

    console.log(options);

    this.emit('change');
  }

  addPlayer(options) {
    const r = Math.round(Math.random() * 155) + 100;
    const g = Math.round(Math.random() * 155) + 100;
    const b = Math.round(Math.random() * 155) + 100;
    this.options.playerOptions.push({
      startCoord: [150,150],
      direction: Math.random() * Math.PI * 2,
      keyCodes: {
        leftCode: undefined,
        rightCode: undefined,
      },
      colour: 'rgba(' + r + ',' + g + ',' + b + ',0.5)',
    })

    this.emit('player_change');
  }

  removePlayer(index) {
    this.options.playerOptions.splice(index, 1);
    
    this.emit('player_change');
  }

  getAll() {
    return this.options;
  }

  handleActions(action) {
    switch(action.type) {
      case 'UPDATE_OPTIONS': {
        this.updateOptions(action.options)
        break
      }
      case 'ADD_PLAYER': {
        this.addPlayer(action.options)
        break
      }
      case 'REMOVE_PLAYER': {
        this.removePlayer(action.index)
        break
      }
    }
  }
}

const optionsStore = new OptionsStore;
dispatcher.register(optionsStore.handleActions.bind(optionsStore));

export default optionsStore;
