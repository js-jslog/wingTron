import { EventEmitter } from 'events';

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
      environmentOptions: {
        scoreboardFunction: function (a) {
          console.log(a);
        },
      },
    };
  }

  updateOption(fieldWidth) {
    this.options.gameOptions.fieldWidth = fieldWidth;
    this.options.gameOptions.fieldHeight = fieldWidth;

    this.emit('change');
  }

  getAll() {
    return this.options;
  }
}

const optionsStore = new OptionsStore;

export default optionsStore;
