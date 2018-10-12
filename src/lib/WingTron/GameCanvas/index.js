// @flow

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { drawField, drawPaths, drawPlayers } from './canvasDrawer'

import * as ActionCreators from '~/duck/actions'

import type { Game } from '~/common/flow-types'

type Props = {
  ...Game,
  actionCreators: Object
}

class GameCanvasComponent extends Component<Game, null> {

  ctx: CanvasRenderingContext2D

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

    const { match } = this.props
    const { paths } = this.props
    const { players } = this.props

    if ( !match || !paths || !players ) {
      throw new Error("Draw has been called without required properties")
    }

    drawField(this.ctx, match)
    drawPaths(this.ctx, paths, players)
    drawPlayers(this.ctx, players, paths)
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

