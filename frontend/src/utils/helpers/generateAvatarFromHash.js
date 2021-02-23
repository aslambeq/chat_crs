import tinycolor from 'tinycolor2'

const getCorrectIndex = num => {
  // if (num > 255) {
  //   return 255
  // }
  // if (num < 0) {
  //   return 0
  // }
  return num > 255 ? 255 : num < 0 ? 0 : num
}

export default hash => {
  const [r, g, b] = hash
    .substr(0, 3)
    .split('')
    .map(char => getCorrectIndex(char.charCodeAt(0)))
  return {
    color: tinycolor({ r, g, b }).lighten(10).saturate(10).toHexString(),
    colorLighten: tinycolor({ r, g, b }).lighten(30).saturate(30).toHexString()
  }
}
