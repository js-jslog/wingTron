const validateOptions = (options) => {
  return options
    && checkPresenceOfMandatoryFields(options)
}

const checkPresenceOfMandatoryFields = (options) => {
  const requiredFields = [
    'field_width',
    'field_height',
    'matches',
    'player_options',
  ]
  return requiredFields.every(option_key => options[option_key])
}

const validatePlayerOptions = (player_options) => {
  const requiredFields = [
    'start_coord_x',
    'start_coord_y',
    'direction',
    'turn_left_keycode',
    'turn_right_keycode',
    'colour',
  ]
  return requiredFields.every(option_key => player_options[option_key])
}

module.exports = {
  validateOptions: validateOptions,
  checkPresenceOfMandatoryFields: checkPresenceOfMandatoryFields,
  validatePlayerOptions: validatePlayerOptions,
}
