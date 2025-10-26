import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export default function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!user) return <p style={{ margin: 40, fontFamily: 'system-ui' }}>No user is signed in.</p>

  return (
    <div style={{ fontFamily: 'system-ui', margin: 40 }}>
      <h2>Current user</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <button
        onClick={async () => {
          await supabase.auth.signOut()
          window.location.reload()
        }}
        style={{ padding: 10, marginTop: 12 }}
      >
        Sign out
      </button>
    </div>
  )
}
