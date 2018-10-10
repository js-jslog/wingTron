// @flow

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as ActionCreators from '~/duck/actions'

import GameLoop from './GameLoop'
import GameCanvas from './GameCanvas'
import KeyHandler from './KeyHandler'

type Props = {
  callback?: Function,
  update_interval?: number
}

class WingTronComponent extends Component<Props, null> {

  constructor(props: Props) {
    super(props)
    if (props.callback) {
      props.callback(this.startGame.bind(this))
    }
  }

  render() {

    return (
      <div>
        <GameLoop { ...this.props } />
        <GameCanvas />
        <KeyHandler />
      </div>
    )
  }

  startGame() {
    this.props.actionCreators.startGameFromOptions(this.props.options)
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionCreators: bindActionCreators(ActionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WingTronComponent)

