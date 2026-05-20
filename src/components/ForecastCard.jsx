import { useTranslation } from 'react-i18next'
import { formatForecastDate, formatUnit } from '../utils'

export default function ForecastCard({ day }) {
  const { t } = useTranslation()
  const iconUrl = day?.ForecastIcon != null ? `./weather_icons/pic${day.ForecastIcon}.png` : null

  const minTemp = day?.forecastMintemp?.value ?? '--'
  const maxTemp = day?.forecastMaxtemp?.value ?? '--'
  const tempUnit = formatUnit(day?.forecastMaxtemp?.unit) ?? ''

  const minRh = day?.forecastMinrh?.value ?? '--'
  const maxRh = day?.forecastMaxrh?.value ?? '--'
  const rhUnit = formatUnit(day?.forecastMaxrh?.unit) ?? ''

  return (
    <div className="forecast-card">
      <div className="forecast-card-date">
        <span className="forecast-card-week">{day?.week ?? ''}</span>
        <span className="forecast-card-day">{formatForecastDate(day?.forecastDate)}</span>
      </div>

      <div className="forecast-card-body">
        <div className="forecast-card-left">
          {iconUrl ? (
            <img src={iconUrl} alt={t('currentWeather.weatherIcon')} className="forecast-card-icon" />
          ) : (
            <div className="forecast-card-icon-placeholder" />
          )}
        </div>

        <div className="forecast-card-center">
          <span className="forecast-card-label">{t('currentWeather.temp')}</span>
          <span className="forecast-card-value">
            <strong>{minTemp}</strong>
            <span className="forecast-card-separator"> - </span>
            <strong>{maxTemp}</strong>
            <span className="forecast-card-unit">{tempUnit}</span>
          </span>
        </div>

        <div className="forecast-card-right">
          <span className="forecast-card-label">{t('currentWeather.humidity')}</span>
          <span className="forecast-card-value">
            <strong>{minRh}</strong>
            <span className="forecast-card-separator"> - </span>
            <strong>{maxRh}</strong>
            <span className="forecast-card-unit">{rhUnit}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
