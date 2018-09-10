// @flow

type PlayerOptions = {
  start_coord_x: string,
  start_coord_y: string,
  direction: string,
  turn_left_keycode: string,
  turn_right_keycode: string,
  colour: string
}

export const optionsConverter = (options: PlayerOptions) => {
  const state = { ...options }
  state.start_coord_x = parseInt(state.start_coord_x)
  state.start_coord_y = parseInt(state.start_coord_y)
  state.direction = parseInt(state.direction)
  state.turn_left_keycode = parseInt(state.turn_left_keycode)
  state.turn_right_keycode = parseInt(state.turn_right_keycode)

  return state
}
