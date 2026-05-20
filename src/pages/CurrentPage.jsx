import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CurrentWeather from '../components/CurrentWeather'
import { useWeather } from '../hooks/useWeather'
import { useSettings } from '../hooks/useSettings'
import { findStationReading } from '../utils'

export default function CurrentPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { language, station } = useSettings()
  const { current, loading, error } = useWeather(language)

  const icon = current?.icon?.[0] ?? null

  const temperature = useMemo(() => {
    if (!current?.temperature?.data) return null
    return findStationReading(current.temperature.data, station?.name?.[language])
  }, [current, station, language])

  const humidity = useMemo(() => {
    if (!current?.humidity?.data) return null
    return current.humidity.data[0]
  }, [current])

  return (
    <div className="page current-page">
      <button
        type="button"
        className="nav-icon-btn nav-icon-btn--right"
        onClick={() => navigate('/settings')}
        aria-label={t('settings.title')}
      >
        <svg className="nav-icon" width="20" height="20">
          <use href="icons.svg#gear-icon" />
        </svg>
      </button>
      {loading && <p className="current-page-status">{t('common.loading')}</p>}
      {error && <p className="current-page-status current-page-error">{error}</p>}
      {!loading && !error && (
        <div style={{ width: '100%' }}>
          <h2 className="page-title">{t('currentWeather.title')}</h2>
          <CurrentWeather
            icon={icon}
            temperature={temperature}
            humidity={humidity}
          />
          <button
            type="button"
            className="page-nav-btn"
            onClick={() => navigate('/forecast')}
          >
            {t('nav.forecast')}
          </button>
        </div>
      )}
    </div>
  )
}
