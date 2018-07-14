import GameStore from './GameStore.js'

class CanvasDrawer {

  drawField(ctx) {
    ctx.fillStyle = "#444";
    ctx.strokeStyle = "#444";
    ctx.fillRect(0, 0, GameStore.state.field_width, GameStore.state.field_height);
  }

  drawPlayers(ctx) {
    GameStore.state.player_state.forEach(player_state => {
      const player_size = 3
      const offset = (player_size -1) /2
      const colour = player_state.colour
      const coords = player_state.path[0]

      ctx.fillStyle = colour
      ctx.strokeStyle = colour
      ctx.fillRect(coords[0]-offset, coords[1]-offset, player_size, player_size)
    })
  }

  drawPaths(ctx) {
    GameStore.state.player_state.forEach(player_state => {
      //const path2d = new Path2D()
      const path2d = {}
      const path = player_state.path
      const colour = player_state.colour

      //path2d.moveTo(path[0][0], path[0][1])
      path.forEach(function (coord) {
        //path2d.lineTo(coord[0], coord[1])
      });
      ctx.fillStyle = colour;
      ctx.strokeStyle = colour;
      ctx.fill(path2d);
    })
  }
}

const CanvasDrawerInstance = new CanvasDrawer

export default CanvasDrawerInstance
