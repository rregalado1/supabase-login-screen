import { useMemo, useState } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import ResetPassword from './ResetPassword'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const isRecovery = useMemo(
    () => typeof window !== 'undefined' && window.location.hash.includes('type=recovery'),
    []
  )

  if (isRecovery) return <ResetPassword />
  return loggedIn ? <Dashboard /> : <Login onLoggedIn={() => setLoggedIn(true)} />
}
