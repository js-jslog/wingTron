import React, { Component } from "react"
import { getOptions, updateGameOptions, startGame, registerOptionsChangeCallback, addPlayer, removePlayer } from '../../src/lib/WingTron.jsx'
// TODO: why is this imported from the src folder rather than the built lib

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
      field_width: this.refs.field_width.value,
      field_height: this.refs.field_height.value,
      matches: this.refs.matches.value,
      player_options: [],
    }
    for (var i=0; i<this.refs.player_sections.children.length; i++) {
      var start_coord_x = this.refs['p' + i + '_start_coord_x'].value;
      var start_coord_y = this.refs['p' + i + '_start_coord_y'].value;
      var direction = this.refs['p' + i + '_direction'].value;
      var turn_left_keycode = this.refs['p' + i + '_turn_left_keycode'].value;
      var turn_right_keycode = this.refs['p' + i + '_turn_right_keycode'].value;
      var colour = this.refs['p' + i + '_colour'].value;
      options.player_options.push({
        start_coord_x: start_coord_x, 
        start_coord_y: start_coord_y,
        direction: direction,
        turn_left_keycode: turn_left_keycode,
        turn_right_keycode: turn_right_keycode,
        colour: colour,
      });
    }
    updateGameOptions(JSON.stringify(options));
  }

  addPlayer() {
    addPlayer()
  }
  
  removePlayer(index) {
    removePlayer(index)
  }

  startGame() {
    startGame()
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
          <input ref={ 'p' + index + '_start_coord_x' } value={ option_set.start_coord_x } onChange={this.updateOptions.bind(this)} />
          <span> (&amp; y)</span>
          <input ref={ 'p' + index + '_start_coord_y' } value={ option_set.start_coord_y } onChange={this.updateOptions.bind(this)} />
        </div>
        <div>
          <span>Direction</span>
          <input ref={ 'p' + index + '_direction' } value={ option_set.direction } onChange={this.updateOptions.bind(this)} />
        </div>
        <div>
          <span>Left key</span>
          <input ref={ 'p' + index + '_turn_left_keycode' } value={ option_set.turn_left_keycode } onChange={this.updateOptions.bind(this)} onKeyDown={ this.translateKeyCode.bind(this) } />
          <span>Right key</span>
          <input ref={ 'p' + index + '_turn_right_keycode' } value={ option_set.turn_right_keycode } onChange={this.updateOptions.bind(this)} onKeyDown={ this.translateKeyCode.bind(this) } />
        </div>
        <div>
          <span>Colour</span>
          <input ref={ 'p' + index + '_colour' } value={ option_set.colour } onChange={this.updateOptions.bind(this)} />
        </div>
        <div>
          <button onClick={this.removePlayer.bind(this, index)}>Remove this player</button>
        </div>
      </div>
    );
    return (
      <div>
        <div>
          <input ref='field_width' value={ options.field_width } onChange={this.updateOptions.bind(this)} />
          <span>Field width</span>
        </div>
        <div>
          <input ref='field_height' value={ options.field_height } onChange={this.updateOptions.bind(this)} />
          <span>Field height</span>
        </div>
        <div>
          <input ref='matches' value={ options.matches } onChange={this.updateOptions.bind(this)} />
          <span>Matches</span>
        </div>
        <h2>Players:</h2>
        <div ref='player_sections'>
          { player_sections }
        </div>
        <button onClick={this.startGame.bind(this)}>Start Game!</button>
        <button onClick={this.addPlayer.bind(this)}>Add player</button>
      </div>
    );
  }
}


export default ControlPanel;
