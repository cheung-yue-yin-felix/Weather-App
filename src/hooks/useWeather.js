import { useState, useEffect } from 'react'
import { fetchCurrentWeather, fetchForecast } from '../api'
import { REFRESH_INTERVAL } from '../config/settings'

export function useWeather(language) {
  const [current, setCurrent] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    let timeoutId

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [currRes, fcastRes] = await Promise.all([
          fetchCurrentWeather(language, controller.signal),
          fetchForecast(language, controller.signal),
        ])
        setCurrent(currRes)
        setForecast(fcastRes)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
        timeoutId = setTimeout(load, REFRESH_INTERVAL)
      }
    }

    load()

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [language])

  return { current, forecast, loading, error }
}
