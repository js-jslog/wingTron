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

describe('validateOptions', () => {

  describe('the happy path', () => {

    test('that a valid options object is correctly evaluated', () => {
      expect(validateOptions(template_valid_options)).toBeTruthy()
    })
  })

  describe('that the main options must all be present', () => {

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
  })

  describe('that all main options must be strings (apart from the player_options which must be an array)', () => {

    test('that the field_width option must be a string', () => {
      let valid_options_with_numeric_field_width = Object.assign({}, template_valid_options)
      valid_options_with_numeric_field_width.field_width = parseInt(valid_options_with_numeric_field_width.field_width)

      expect(validateOptions(valid_options_with_numeric_field_width)).toBeFalsy()
    })

    test('that the field_height option must be a string', () => {
      let valid_options_with_numeric_field_height = Object.assign({}, template_valid_options)
      valid_options_with_numeric_field_height.field_height = parseInt(valid_options_with_numeric_field_height.field_height)

      expect(validateOptions(valid_options_with_numeric_field_height)).toBeFalsy()
    })

    test('that the matches option must be a string', () => {
      let valid_options_with_numeric_matches = Object.assign({}, template_valid_options)
      valid_options_with_numeric_matches.matches = parseInt(valid_options_with_numeric_matches.matches)

      expect(validateOptions(valid_options_with_numeric_matches)).toBeFalsy()
    })

    test('that the player_options option must be an array', () => {
      let valid_options_with_object_player_options = Object.assign({}, template_valid_options)
      valid_options_with_object_player_options.player_options = {}

      expect(validateOptions(valid_options_with_object_player_options)).toBeFalsy()
    })
  })
})

describe('validatePlayerOptions', () => {

  describe('the simple paths', () => {

    test('that a valid player_options object is correctly evaluated', () => {
      expect(validatePlayerOptions(template_valid_player_options)).toBeTruthy()
    })
  })

  describe('that the main player_options must all be present', () => {

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
  })

  describe('that all main player_options must be strings', () => {

    test('that the start_coord_x option must be a string', () => {
      let valid_player_options_with_numeric_start_coord_x = Object.assign({}, template_valid_player_options)
      valid_player_options_with_numeric_start_coord_x.start_coord_x = parseInt(valid_player_options_with_numeric_start_coord_x.start_coord_x)

      expect(validatePlayerOptions(valid_player_options_with_numeric_start_coord_x)).toBeFalsy()
    })

    test('that the start_coord_y option must be a string', () => {
      let valid_player_options_with_numeric_start_coord_y = Object.assign({}, template_valid_player_options)
      valid_player_options_with_numeric_start_coord_y.start_coord_y = parseInt(valid_player_options_with_numeric_start_coord_y.start_coord_y)

      expect(validatePlayerOptions(valid_player_options_with_numeric_start_coord_y)).toBeFalsy()
    })

    test('that the direction option must be a string', () => {
      let valid_player_options_with_numeric_direction = Object.assign({}, template_valid_player_options)
      valid_player_options_with_numeric_direction.direction = parseInt(valid_player_options_with_numeric_direction.direction)

      expect(validatePlayerOptions(valid_player_options_with_numeric_direction)).toBeFalsy()
    })

    test('that the turn_left_keycode option must be a string', () => {
      let valid_player_options_with_numeric_turn_left_keycode = Object.assign({}, template_valid_player_options)
      valid_player_options_with_numeric_turn_left_keycode.turn_left_keycode = parseInt(valid_player_options_with_numeric_turn_left_keycode.turn_left_keycode)

      expect(validatePlayerOptions(valid_player_options_with_numeric_turn_left_keycode)).toBeFalsy()
    })

    test('that the turn_right_keycode option must be a string', () => {
      let valid_player_options_with_numeric_turn_right_keycode = Object.assign({}, template_valid_player_options)
      valid_player_options_with_numeric_turn_right_keycode.turn_right_keycode = parseInt(valid_player_options_with_numeric_turn_right_keycode.turn_right_keycode)

      expect(validatePlayerOptions(valid_player_options_with_numeric_turn_right_keycode)).toBeFalsy()
    })

    test('that the colour option must be a string', () => {
      let valid_player_options_with_numeric_colour = Object.assign({}, template_valid_player_options)
      valid_player_options_with_numeric_colour.colour = 123

      expect(validatePlayerOptions(valid_player_options_with_numeric_colour)).toBeFalsy()
    })
  })
})
