import React, { Component } from "react"
import { getOptions, updateGameOptions, startGame, registerOptionsChangeCallback, addPlayer } from '../../src/restructure/WingTron.jsx'

class ControlPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: JSON.parse(getOptions()),
    }
    registerOptionsChangeCallback(this.updateLocalOptions.bind(this))
  }

  updateLocalOptions() {
    this.setState({
      options: JSON.parse(getOptions()),
    })
  }

  updateOptions() {
    var options = {
      game_options: {
        field_width: this.refs.field_width.value,
        field_height: this.refs.field_height.value,
        matches: this.refs.matches.value,
      },
      player_options: [],
      environmentOptions: {},
    }
    for (var i=0; i<this.refs.player_sections.children.length; i++) {
      var start_coord_x = this.refs['p' + i + '_start_coord_x'].value;
      var start_coord_y = this.refs['p' + i + '_start_coord_y'].value;
      var direction = this.refs['p' + i + '_direction'].value;
      var turn_left_keycode = this.refs['p' + i + '_turn_left_keycode'].value;
      var turn_right_keycode = this.refs['p' + i + '_turn_right_keycode'].value;
      var colour = this.refs['p' + i + '_colour'].value;
      options.player_options.push({
        startCoord: [start_coord_x, start_coord_y],
        direction: direction,
        keyCodes: {
          turn_left_keycode: turn_left_keycode,
          turn_right_keycode: turn_right_keycode,
        },
        colour: colour,
      });
    }
    updateGameOptions(JSON.stringify(options));
    startGame()
  }

  addPlayer() {
    addPlayer()
  }
  
  removePlayer(index) {
    //OptionsActions.removePlayer(index)
  }

  translateKeyCode(evt)
  {
    //    evt.preventDefault()
    //    evt.target.value = evt.keyCode
    //    return false;
  }

  render() {
    const { color, children } = this.props;
    const options = this.state.options
    const player_options = options.player_options;
    const player_sections = player_options.map((option_set, index) =>
      <div key={ index }>
        <h3>Player{ index }</h3>
        <div>
          <span>Start coords: (x)</span>
          <input ref={ 'p' + index + '_start_coord_x' } defaultValue={ option_set.start_coord_x } />
          <span> (&amp; y)</span>
          <input ref={ 'p' + index + '_start_coord_y' } defaultValue={ option_set.start_coord_y } />
        </div>
        <div>
          <span>Direction</span>
          <input ref={ 'p' + index + '_direction' } defaultValue={ option_set.direction } />
        </div>
        <div>
          <span>Left key</span>
          <input ref={ 'p' + index + '_turn_left_keycode' } defaultValue={ option_set.turn_left_keycode } onKeyDown={ this.translateKeyCode.bind(this) } />
          <span>Right key</span>
          <input ref={ 'p' + index + '_turn_right_keycode' } defaultValue={ option_set.turn_right_keycode } onKeyDown={ this.translateKeyCode.bind(this) } />
        </div>
        <div>
          <span>Colour</span>
          <input ref={ 'p' + index + '_colour' } defaultValue={ option_set.colour } />
        </div>
      </div>
    );
    return (
      <div>
        <div>
          <input ref='field_width' defaultValue={ options.field_width } />
          <span>Field width</span>
        </div>
        <div>
          <input ref='field_height' defaultValue={ options.field_height } />
          <span>Field height</span>
        </div>
        <div>
          <input ref='matches' defaultValue={ options.matches } />
          <span>Matches</span>
        </div>
        <h2>Players:</h2>
        <div ref='player_sections'>
          { player_sections }
        </div>
        <button onClick={this.updateOptions.bind(this)}>Start Game!</button>
        <button onClick={this.addPlayer.bind(this)}>Add player</button>
      </div>
    );
  }
}


export default ControlPanel;
