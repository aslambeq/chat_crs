export default num => {
  const mins = Math.floor(num / 60)
  const secs = (num % 60).toFixed()
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
}
