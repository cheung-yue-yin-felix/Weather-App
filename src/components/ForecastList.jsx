import ForecastCard from './ForecastCard'

export default function ForecastList({ days }) {
  if (!days || days.length === 0) return null

  return (
    <div className="forecast-list">
      {days.map((day, index) => (
        <ForecastCard key={day?.forecastDate ?? index} day={day} />
      ))}
    </div>
  )
}
