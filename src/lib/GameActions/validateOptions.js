const validateOptions = (options) => {
  return options
    && checkPresenceOfMandatoryOptions(options)
    && checkTypesOfMandatoryOptions(options)
    && options.player_options.every(validatePlayerOptions)
}

const validatePlayerOptions = (player_options) => {
  return player_options
    && checkPresenceOfMandatoryPlayerOptions(player_options)
    && checkTypesOfMandatoryPlayerOptions(player_options)
}

const checkPresenceOfMandatoryOptions = (options) => {
  const requiredFields = [
    'field_width',
    'field_height',
    'matches',
    'player_options',
  ]
  return requiredFields.every(option_key => options[option_key])
}

const checkPresenceOfMandatoryPlayerOptions = (player_options) => {
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

const checkTypesOfMandatoryOptions = (options) => {
  const options_keys = Object.keys(options)
  const types_appropriate = options_keys.every(key => {
    if (key !== 'player_options') {
      return (typeof options[key] === 'string')
    } else {
      return (Array.isArray(options[key]))
    }
  })
  return types_appropriate
}

const checkTypesOfMandatoryPlayerOptions = (options) => {
  const options_keys = Object.keys(options)
  return options_keys.every(key => (typeof options[key] === 'string'))
}

module.exports = {
  validateOptions: validateOptions,
  validatePlayerOptions: validatePlayerOptions,
}
