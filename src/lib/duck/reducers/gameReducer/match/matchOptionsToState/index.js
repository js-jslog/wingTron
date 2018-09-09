export const matchOptionsToState = (options) => {
  const state = { ...options }
  Object.keys(state).forEach(key => {
    state[key] = transformOption(key, state[key])
  })

  return state
}

const transformOption = (key, option) => {
  return parseInt(option)
}
