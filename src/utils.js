export function formatUnit(unit) {
  if (unit === 'percent') return '%'
  if (unit === 'C') return '°C'
  return unit
}

export function findStationReading(data, stationName) {
  if (!data || !stationName) return null
  const exact = data.find((d) => d.place === stationName)
  if (exact) return exact
  return data[0] ?? null
}

export function formatForecastDate(yyyymmdd) {
  if (!yyyymmdd || yyyymmdd.length !== 8) return yyyymmdd
  const year = yyyymmdd.slice(0, 4)
  const month = yyyymmdd.slice(4, 6)
  const day = yyyymmdd.slice(6, 8)
  return `${year}-${month}-${day}`
}
