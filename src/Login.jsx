import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Login({ onLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null); setInfo(null); setLoading(true)

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setInfo('Account created. Please check your email to confirm your account.')
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        onLoggedIn?.(data.user)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleForgotPassword() {
    setError(null); setInfo(null)
    if (!email) { setError('Please enter your email first.'); return }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin   // http://localhost:3000
    })
    if (error) setError(error.message)
    else setInfo('We sent you an email to reset your password.')
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', textAlign: 'center', fontFamily: 'system-ui' }}>
      <h2>{mode === 'signup' ? 'Create account' : 'Sign in'}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
          required
        />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
          {loading ? 'Loading...' : mode === 'signup' ? 'Register' : 'Sign in'}
        </button>
      </form>

      <div style={{ marginTop: 10 }}>
        <button
          onClick={handleForgotPassword}
          style={{ border:'none', background:'none', color:'#2563eb', cursor:'pointer' }}
        >
          Forgot your password?
        </button>
      </div>

      {error && <p style={{ color:'crimson', marginTop: 8 }}>{error}</p>}
      {info && <p style={{ color:'green', marginTop: 8 }}>{info}</p>}

      <p style={{ marginTop: 15 }}>
        {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
          style={{ border:'none', background:'none', color:'#2563eb', cursor:'pointer' }}
        >
          {mode === 'signup' ? 'Sign in' : 'Sign up'}
        </button>
      </p>
    </div>
  )
}
