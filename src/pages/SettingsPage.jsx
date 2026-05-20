import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { hongKongDistricts } from '../assets/districts.js'
import { useSettings } from '../hooks/useSettings'

export default function SettingsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    language,
    districtIndex,
    stationIndex,
    district,
    setLanguage,
    setDistrictIndex,
    setStationIndex,
  } = useSettings()

  return (
    <div className="page settings-page">
      <button
        type="button"
        className="nav-icon-btn nav-icon-btn--left"
        onClick={() => navigate(-1)}
        aria-label={t('common.back')}
      >
        <svg className="nav-icon" width="20" height="20">
          <use href="icons.svg#close-icon" />
        </svg>
      </button>
      <div className="settings-card">
        <h2 className="settings-title">{t('settings.title')}</h2>

        <div className="settings-row">
          <label className="settings-label" htmlFor="language">
            {t('settings.language')}
          </label>
          <select
            id="language"
            className="settings-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">{t('language.en')}</option>
            <option value="tc">{t('language.tc')}</option>
            <option value="sc">{t('language.sc')}</option>
          </select>
        </div>

        <div className="settings-row">
          <label className="settings-label" htmlFor="district">
            {t('settings.district')}
          </label>
          <select
            id="district"
            className="settings-select"
            value={districtIndex}
            onChange={(e) => setDistrictIndex(Number(e.target.value))}
          >
            {hongKongDistricts.map((d, i) => (
              <option key={i} value={i}>
                {d.name[language]}
              </option>
            ))}
          </select>
        </div>

        <div className="settings-row">
          <label className="settings-label" htmlFor="station">
            {t('settings.station')}
          </label>
          <select
            id="station"
            className="settings-select"
            value={stationIndex}
            onChange={(e) => setStationIndex(Number(e.target.value))}
          >
            {district?.stations.map((s, i) => (
              <option key={i} value={i}>
                {s.name[language]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
