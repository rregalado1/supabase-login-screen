import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [msg, setMsg] = useState(null)
  const [err, setErr] = useState(null)

  useEffect(() => {
    const isRecovery = window.location.hash.includes('type=recovery')
    if (!isRecovery) setErr('Invalid recovery link.')
  }, [])

  async function handleUpdate(e) {
    e.preventDefault()
    setErr(null); setMsg(null)
    if (password.length < 6) { setErr('Password must be at least 6 characters long.'); return }
    if (password !== confirm) { setErr('Passwords do not match.'); return }

    const { error } = await supabase.auth.updateUser({ password })
    if (error) setErr(error.message)
    else setMsg('Password updated successfully. You can now log in.')
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', fontFamily: 'system-ui' }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Update Password
        </button>
      </form>

      {err && <p style={{ color: 'crimson', marginTop: 8 }}>{err}</p>}
      {msg && <p style={{ color: 'green', marginTop: 8 }}>{msg}</p>}

      <p style={{ marginTop: 12 }}>
        <a href="/" style={{ color: '#2563eb' }}>Back to login</a>
      </p>
    </div>
  )
}
