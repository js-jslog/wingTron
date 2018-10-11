// @flow

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as ActionCreators from '~/duck/actions'

import type { Options } from '~/common/flow-types'

type ActionCreatorsType = {
  actionCreators: Object
}

type Props = {
  ...Options,
  ...ActionCreatorsType
}


export class ControlPanelReduxComponent extends Component<Props, null> {

  render() {

    // $FlowFixMe
    const onClick = function () {
      this.props.actionCreators.startGameFromOptions(this.props.options)
    }

    return (
      <div>
        <button onClick={onClick.bind(this)}>
          Start Game
        </button>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    options: { ...state.options }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionCreators: bindActionCreators(ActionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanelReduxComponent)

