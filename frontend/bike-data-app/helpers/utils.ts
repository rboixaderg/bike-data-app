export const formattedDateFromSeconds = (totalSeconds: number, withSeconds = true): string => {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.floor((totalSeconds % 3600) % 60)

  const hDisplay = h > 0 ? h + (h === 1 ? ' hour' : ' hours') : ''
  const mDisplay = m > 0 ? m + (m === 1 ? ' minute' : ' minutes') : ''
  const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : ''

  const result = `${hDisplay} ${mDisplay}`
  return withSeconds ? `${result} ${sDisplay}` : result
}

export const formattedDistance = (value) => {
  if (value > 0) {
    return `${value / 1000} km`
  }
  return '0 km'
}

export const formattedSpeed = (value) => {
  return `${new Intl.NumberFormat().format(value * 3.6)} km/h`
}
