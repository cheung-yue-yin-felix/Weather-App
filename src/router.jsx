import { createHashRouter } from 'react-router-dom'
import CurrentPage from './pages/CurrentPage'
import ForecastPage from './pages/ForecastPage'
import SettingsPage from './pages/SettingsPage'

export const router = createHashRouter([
  { path: '/', element: <CurrentPage /> },
  { path: '/current', element: <CurrentPage /> },
  { path: '/forecast', element: <ForecastPage /> },
  { path: '/settings', element: <SettingsPage /> },
])
