// @flow

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as ActionCreators from '~/duck/actions'

import type { Players } from '~/common/flow-types'

type Props = {
  players: { ...Players },
  actionCreators: Object
}

class KeyHandlerComponent extends Component<Props, null> {

  componentDidMount() {
    document.removeEventListener('keydown', this.handleKeyEvent.bind(this))
    document.removeEventListener('keyup', this.handleKeyEvent.bind(this))
    document.addEventListener('keydown', this.handleKeyEvent.bind(this))
    document.addEventListener('keyup', this.handleKeyEvent.bind(this))
  }

  // TODO: can I get away without a render, and if I can't, does this
  // need to be a react component?
  render() {

    return (
      <div />
    )
  }

  handleKeyEvent(event) {
    const { players } = this.props
    this.props.actionCreators.handleKeyEvent(event, players)
  }

}
const mapStateToProps = (state) => {
  return {
    players: { ...state.game.players }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionCreators: bindActionCreators(ActionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyHandlerComponent)

