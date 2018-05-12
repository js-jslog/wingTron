import { validateOptions, validatePlayerOptions } from '../src/restructure/Governor/validateOptions.js'

const template_valid_player_options = {
  start_coord_x: '200',
  start_coord_y: '200',
  direction: '0',
  turn_left_keycode: '65',
  turn_right_keycode: '68',
  colour: "rgba(0,0,255, 0.5)",
}

const template_valid_options = {
  field_width: '200',
  field_height: '200',
  matches: '10',
  player_options: [
    template_valid_player_options,
  ],
}

// test the obvious fails
test('that an undefined parameter is invalid', () => {
  expect(validateOptions(undefined)).toBeFalsy()
});

test('that an empty object is invalid', () => {
  expect(validateOptions({})).toBeFalsy()
});

// test the happy paths
test('that a valid options object is correctly evaluated', () => {
  expect(validateOptions(template_valid_options)).toBeTruthy()
})

test('that a valid player_options object is correctly evaluated', () => {
  expect(validatePlayerOptions(template_valid_player_options)).toBeTruthy()
})

// test that the individual checks for option presence are working
test('that the options must contain field width', () => {
  let valid_options_minus_field_width = Object.assign({}, template_valid_options)
  delete valid_options_minus_field_width.field_width

  expect(validateOptions(valid_options_minus_field_width)).toBeFalsy()
})

test('that the options must contain field height', () => {
  let valid_options_minus_field_height = Object.assign({}, template_valid_options)
  delete valid_options_minus_field_height.field_height

  expect(validateOptions(valid_options_minus_field_height)).toBeFalsy()
})

test('that the options must contain a matches option', () => {
  let valid_options_minus_matches = Object.assign({}, template_valid_options)
  delete valid_options_minus_matches.matches

  expect(validateOptions(valid_options_minus_matches)).toBeFalsy()
})

test('that the options must contain a player_options option', () => {
  let valid_options_minus_player_options = Object.assign({}, template_valid_options)
  delete valid_options_minus_player_options.player_options

  expect(validateOptions(valid_options_minus_player_options)).toBeFalsy()
})

// test that the checks for individual player_options presence are working
test('that a player_option must contain a start_coord_x option', () => {
  let valid_player_options_minus_start_coord_x = Object.assign({}, template_valid_player_options)
  delete valid_player_options_minus_start_coord_x.start_coord_x

  expect(validatePlayerOptions(valid_player_options_minus_start_coord_x)).toBeFalsy()
})

test('that a player_option must contain a start_coord_y option', () => {
  let valid_player_options_minus_start_coord_y = Object.assign({}, template_valid_player_options)
  delete valid_player_options_minus_start_coord_y.start_coord_y

  expect(validatePlayerOptions(valid_player_options_minus_start_coord_y)).toBeFalsy()
})

test('that a player_option must contain a direction option', () => {
  let valid_player_options_minus_direction = Object.assign({}, template_valid_player_options)
  delete valid_player_options_minus_direction.direction

  expect(validatePlayerOptions(valid_player_options_minus_direction)).toBeFalsy()
})

test('that a player_option must contain a turn_left_keycode option', () => {
  let valid_player_options_minus_turn_left_keycode = Object.assign({}, template_valid_player_options)
  delete valid_player_options_minus_turn_left_keycode.turn_left_keycode

  expect(validatePlayerOptions(valid_player_options_minus_turn_left_keycode)).toBeFalsy()
})

test('that a player_option must contain a turn_right_keycode option', () => {
  let valid_player_options_minus_turn_right_keycode = Object.assign({}, template_valid_player_options)
  delete valid_player_options_minus_turn_right_keycode.turn_right_keycode

  expect(validatePlayerOptions(valid_player_options_minus_turn_right_keycode)).toBeFalsy()
})

test('that a player_option must contain a colour option', () => {
  let valid_player_options_minus_colour = Object.assign({}, template_valid_player_options)
  delete valid_player_options_minus_colour.colour

  expect(validatePlayerOptions(valid_player_options_minus_colour)).toBeFalsy()
})

