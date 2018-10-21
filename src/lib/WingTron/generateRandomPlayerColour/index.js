// @flow

export const generateRandomPlayerColour = () => {
  const red = Math.random() * 255
  const green = Math.random() * 255
  const blue = Math.random() * 255

  const rgba = 'rgba(' + red + ', ' + green + ', ' + blue + ', 0.5)'

  return rgba
}

