// @flow

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { drawField, drawPaths, drawPlayers } from './canvasDrawer'

import * as ActionCreators from '~/duck/actions'

import type { Game } from '~/common/flow-types'

type ActionCreatorsType = {
  actionCreators: Object
}

type Props = {
  ...Game,
  ...ActionCreatorsType
}

class GameCanvasComponent extends Component<Game, null> {

  ctx = undefined

  componentDidMount() {
    const canvas = this.refs.canvas
    this.ctx = canvas.getContext('2d')
  }

  render() {

    const field_width = this.props.match && this.props.match.field_width
    const field_height = this.props.match && this.props.match.field_height

    if (this.ctx) {
      this.draw()
    }

    return (
      <canvas
        width={ field_width }
        height={ field_height }
        ref='canvas'
      />
    )
  }

  draw() {

    drawField(this.ctx, this.props.match)
    drawPaths(this.ctx, this.props.paths, this.props.players)
    drawPlayers(this.ctx, this.props.players, this.props.paths)
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.renderableGame,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionCreators: bindActionCreators(ActionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameCanvasComponent)

