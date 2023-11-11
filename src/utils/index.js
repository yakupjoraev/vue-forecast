const PRESSURE_UNITS = 0.750062;

export const getPressureMn = (hpa) => {
  return Math.round(hpa * PRESSURE_UNITS)
}

export const getTime = (seconds) => {
  return new Date(seconds * 1000).toLocaleTimeString('ru-RU', { timeZone: 'Atlantic/Reykjavik' })
}