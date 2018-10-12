// @flow

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as ActionCreators from '~/duck/actions'

import type { Game } from '~/common/flow-types'

type Props = {
  ...Game,
  actionCreators: Object,
  update_interval?: number
}

class GameLoopComponent extends Component<Props, null> {

  update_interval = 20

  frame_id = undefined

  last_frame_time = undefined
  loop_delta = 0

  fps_estimate = 60
  frames_this_second = 0
  last_fps_update = 0

  store_updates = 0
  store_renders = 0

  constructor(props) {
    super(props)
    this.update_interval = props.update_interval || this.update_interval
  }

  componentDidUpdate() {

    // TODO: there should probably be a boolean on the game 
    // object which says whether the game is underway or not
    if (this.props.paths) {
      this.run(+ new Date())
    } else {
      this.cancel()
    }

  }

  render() {

    return (
      <div>
        <span>fps: { this.frames_this_second }</span>
        <span>updates: { this.store_updates }</span>
        <span>renders: { this.store_renders }</span>
      </div>
    )
  }

  run(timestamp: number) {
    this.mainLoop(timestamp)
  }

  cancel() {
    if (this.frame_id) cancelAnimationFrame(this.frame_id)
  }

  mainLoop(timestamp: number) {

    // TODO: actually make use of the frames estimate to reduce work (possibly in the drawing) before the number of updates check below in employed
    this.calculateFrameRate(timestamp)

    this.loop_delta += this.last_frame_time ? (timestamp - this.last_frame_time) : 0
    this.last_frame_time = timestamp || new Date().getTime()

    let number_of_updates = 0
    while (this.loop_delta >= this.update_interval) {
      this.update(this.loop_delta)
      this.setGameStateAsRenderable()
      this.loop_delta -= this.update_interval

      if (++number_of_updates >= 240) {
        this.panic()
        break;
      }
    }

    this.frame_id = requestAnimationFrame(this.run.bind(this, new Date().getTime()))
  }

  update(loop_delta: number) {
    this.props.actionCreators.progressPlayerPaths(this.props.players)

    this.store_updates ++
  }

  setGameStateAsRenderable() {
    const game = {
      players: this.props.players,
      paths: this.props.paths,
      match: this.props.match
    }
    this.props.actionCreators.setRenderableGame(game)

    this.store_renders ++
  }

  panic() {

    this.loop_delta = 0
  }

  calculateFrameRate(timestamp: number) {

    if (timestamp > this.last_fps_update + 1000) {
      this.fps_estimate = 0.25 * this.frames_this_second + (1 - 0.25) * this.fps_estimate

      this.last_fps_update = timestamp
      this.frames_this_second = 0
    }
    this.frames_this_second++
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.game,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionCreators: bindActionCreators(ActionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameLoopComponent)

