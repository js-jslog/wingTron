export const optionsConverter = (options) => {
  const state = { ...options }
  state.start_coord_x = parseInt(state.start_coord_x)
  state.start_coord_y = parseInt(state.start_coord_y)
  state.direction = parseInt(state.direction)
  state.turn_left_keycode = parseInt(state.turn_left_keycode)
  state.turn_right_keycode = parseInt(state.turn_right_keycode)

  return state
}
