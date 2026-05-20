import { useTranslation } from 'react-i18next'
import { formatUnit } from '../utils'

export default function CurrentWeather({ icon, temperature, humidity }) {
  const { t } = useTranslation()
  const iconUrl = icon != null ? `./weather_icons/pic${icon}.png` : null

  return (
    <div className="current-weather-card">
      <div className="current-weather-section current-weather-icon-wrap">
        {iconUrl ? (
          <img src={iconUrl} alt={t('currentWeather.weatherIcon')} className="current-weather-icon" />
        ) : (
          <div className="current-weather-icon-placeholder" />
        )}
      </div>

      <div className="current-weather-section current-weather-temp">
        <span className="current-weather-label">{t('currentWeather.temp')}</span>
        <span className="current-weather-value">
          <strong>{temperature?.value ?? '--'}</strong>
          <span className="current-weather-unit">{formatUnit(temperature?.unit) ?? ''}</span>
        </span>
      </div>

      <div className="current-weather-section current-weather-humidity">
        <span className="current-weather-label">{t('currentWeather.humidity')}</span>
        <span className="current-weather-value">
          <strong>{humidity?.value ?? '--'}</strong>
          <span className="current-weather-unit">{formatUnit(humidity?.unit) ?? ''}</span>
        </span>
      </div>
    </div>
  )
}
