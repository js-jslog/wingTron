import React, { Component } from "react";
import * as OptionsActions from "../../lib/optionsActions.js";
import OptionsStore from '../../lib/optionsStore.js';

class ControlPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: OptionsStore.getAll()
    }
  }

  updateOptions() {
    var options = {
      gameOptions: {
        fieldWidth: this.refs.optionWidth.value,
        fieldHeight: this.refs.optionHeight.value,
        matches: this.refs.optionMatches.value,
      },
      playerOptions: [],
      environmentOptions: {},
    }
    for (var i=0; i<this.refs.playerSections.children.length; i++) {
      var xcoord = this.refs['p' + i + '_xcoord'].value;
      var ycoord = this.refs['p' + i + '_ycoord'].value;
      var direction = this.refs['p' + i + '_direction'].value;
      var leftKey = this.refs['p' + i + '_leftkey'].value;
      var rightKey = this.refs['p' + i + '_rightkey'].value;
      var colour = this.refs['p' + i + '_colour'].value;
      options.playerOptions.push({
        startCoord: [xcoord, ycoord],
        direction: direction,
        keyCodes: {
          leftCode: leftKey,
          rightCode: rightKey,
        },
        colour: colour,
      });
    }
    OptionsActions.updateOptions(options);
  }

  addPlayer(options) {
    OptionsActions.addPlayer(options)
  }

  removePlayer(index) {
    OptionsActions.removePlayer(index)
  }

  componentWillMount() {
    OptionsStore.on('player_change', () => {
      this.setState({
        options: OptionsStore.getAll(),
      });
    });
  }

  translateKeyCode(evt)
  {
    evt.preventDefault()
    evt.target.value = evt.keyCode
    return false;
  }

  render() {
    const { color, children } = this.props;
    const options = OptionsStore.getAll();
    const gameOptions = options.gameOptions;
    const playerOptions = options.playerOptions;
    const playerSections = playerOptions.map((optionSet, index) =>
      <div key={ index }>
        <h3>Player{ index }</h3>
        <div>
          <span>Start coords: (x)</span>
          <input ref={ 'p' + index + '_xcoord' } defaultValue={ optionSet.startCoord[0] } />
          <span> (&amp; y)</span>
          <input ref={ 'p' + index + '_ycoord' } defaultValue={ optionSet.startCoord[1] } />
        </div>
        <div>
          <span>Direction</span>
          <input ref={ 'p' + index + '_direction' } defaultValue={ optionSet.direction } />
        </div>
        <div>
          <span>Left key</span>
          <input ref={ 'p' + index + '_leftkey' } defaultValue={ optionSet.keyCodes.leftCode } onKeyDown={ this.translateKeyCode.bind(this) } />
          <span>Right key</span>
          <input ref={ 'p' + index + '_rightkey' } defaultValue={ optionSet.keyCodes.rightCode } onKeyDown={ this.translateKeyCode.bind(this) } />
        </div>
        <div>
          <span>Colour</span>
          <input ref={ 'p' + index + '_colour' } defaultValue={ optionSet.colour } />
        </div>
      </div>
    );
    return (
      <div>
        <div>
          <input ref='optionWidth' defaultValue={ gameOptions.fieldWidth } />
          <span>Field width</span>
        </div>
        <div>
          <input ref='optionHeight' defaultValue={ gameOptions.fieldHeight } />
          <span>Field height</span>
        </div>
        <div>
          <input ref='optionMatches' defaultValue={ gameOptions.matches } />
          <span>Matches</span>
        </div>
        <h2>Players:</h2>
        <div ref='playerSections'>
          { playerSections }
        </div>
        <button onClick={this.updateOptions.bind(this)}>Start Game!</button>
        <button onClick={this.addPlayer.bind(this)}>Add player</button>
      </div>
    );
  }
}


export default ControlPanel;
