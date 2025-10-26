import { useState } from 'react'
import { supabase } from './supabaseClient'
import './login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="card">
        {/* soon: logo
        <img src="/logo192.png" alt="Logo" className="logo" />
        */}
        <h1 className="title">Sign in</h1>
        <p className="subtitle">Welcome back! Please enter your details.</p>

        <form onSubmit={handleSubmit} className="form">
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="meta">
          <a className="link" href="/reset">Forgot your password?</a>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <p className="signup">
          Don&apos;t have an account? <a className="link" href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  )
}
