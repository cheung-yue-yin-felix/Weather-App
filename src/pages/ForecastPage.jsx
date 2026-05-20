import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ForecastList from '../components/ForecastList'
import Icon from '../components/Icon'
import { useSettings } from '../hooks/useSettings'
import { useWeather } from '../hooks/useWeather'

export default function ForecastPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { language } = useSettings()
  const { forecast, loading, error } = useWeather(language)

  const days = forecast?.weatherForecast ?? []

  return (
    <div className="page forecast-page">
      <button
        type="button"
        className="nav-icon-btn nav-icon-btn--right"
        onClick={() => navigate('/settings')}
        aria-label={t('settings.title')}
      >
        <Icon name="gear" className="nav-icon" />
      </button>
      {loading && <p className="forecast-page-status">{t('common.loading')}</p>}
      {error && <p className="forecast-page-status forecast-page-error">{error}</p>}
      {!loading && !error && (
        <div style={{ width: '100%' }}>
          <h2 className="page-title">{t('forecast.title')}</h2>
          <ForecastList days={days} />
          <button
            type="button"
            className="page-nav-btn"
            onClick={() => navigate('/current')}
          >
            {t('nav.current')}
          </button>
        </div>
      )}
    </div>
  )
}
