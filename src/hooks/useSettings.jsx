import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import i18n from '../i18n'
import { hongKongDistricts } from '../assets/districts.js'
import {
  LANGUAGE,
  CURRENT_DISTRICT_EN,
  CURRENT_DISTRICT_TC,
  CURRENT_DISTRICT_SC,
  CURRENT_STATION_EN,
  CURRENT_STATION_TC,
  CURRENT_STATION_SC,
} from '../config/settings'

const STORAGE_KEY = 'weather-app-settings'

function getDefaultDistrictIndex() {
  const idx = hongKongDistricts.findIndex(
    (d) =>
      d.name.en === CURRENT_DISTRICT_EN ||
      d.name.tc === CURRENT_DISTRICT_TC ||
      d.name.sc === CURRENT_DISTRICT_SC
  )
  return idx >= 0 ? idx : 0
}

function getDefaultStationIndex(districtIndex) {
  const district = hongKongDistricts[districtIndex]
  if (!district) return 0
  const idx = district.stations.findIndex(
    (s) =>
      s.name.en === CURRENT_STATION_EN ||
      s.name.tc === CURRENT_STATION_TC ||
      s.name.sc === CURRENT_STATION_SC
  )
  return idx >= 0 ? idx : 0
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      const districtIndex = Math.min(
        parsed.districtIndex ?? getDefaultDistrictIndex(),
        hongKongDistricts.length - 1
      )
      const maxStation = hongKongDistricts[districtIndex].stations.length - 1
      const stationIndex = Math.min(
        parsed.stationIndex ?? getDefaultStationIndex(districtIndex),
        maxStation
      )
      return {
        language: parsed.language ?? LANGUAGE,
        districtIndex,
        stationIndex,
      }
    }
  } catch {
    // ignore
  }

  const districtIndex = getDefaultDistrictIndex()
  return {
    language: LANGUAGE,
    districtIndex,
    stationIndex: getDefaultStationIndex(districtIndex),
  }
}

function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // ignore
  }
}

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings)

  useEffect(() => {
    saveSettings(settings)
  }, [settings])

  useEffect(() => {
    document.documentElement.lang = settings.language
  }, [settings.language])

  const setLanguage = useCallback((language) => {
    setSettings((prev) => ({ ...prev, language }))
    i18n.changeLanguage(language)
  }, [])

  const setDistrictIndex = useCallback((districtIndex) => {
    setSettings((prev) => ({
      ...prev,
      districtIndex,
      stationIndex: 0,
    }))
  }, [])

  const setStationIndex = useCallback((stationIndex) => {
    setSettings((prev) => ({ ...prev, stationIndex }))
  }, [])

  const district = hongKongDistricts[settings.districtIndex]
  const station = district?.stations[settings.stationIndex]

  const value = {
    language: settings.language,
    districtIndex: settings.districtIndex,
    stationIndex: settings.stationIndex,
    district,
    station,
    setLanguage,
    setDistrictIndex,
    setStationIndex,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
