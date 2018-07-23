import React, { Component } from "react"

class WingTron extends Component {

  componentDidMount() {
    setKeyBindings(document)
    startGame()
  }

  startGame() {
    var canvas = this.refs.canvas
    canvas.width = OptionsStore.options.fieldWidth
    canvas.height = OptionsStore.options.fieldHeight
    canvas.style.width = '100%'

    GameLoop.run(canvas)
  }

  render() {
    return (
      <canvas ref="canvas" />
    )
  }
}

export default WingTron
