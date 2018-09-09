// TODO: this should be making use of the optionsConverter module one folder down from here
export const playerOptionsToState = (player_options) => {

  const state = player_options.map(player => ({ ...player }))

  return state
}
