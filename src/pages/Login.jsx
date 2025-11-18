import { useState } from 'react'

// Frontend-only auth: we keep a simple user record in localStorage
// cc_users: { email: { name, email, password }, ... }
// On login/register we set cc_token and basic profile, then route to /chat

export default function Login() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const users = JSON.parse(localStorage.getItem('cc_users') || '{}')

      if (mode === 'register') {
        if (users[email]) throw new Error('Account already exists')
        users[email] = { name: name || email.split('@')[0], email, password }
        localStorage.setItem('cc_users', JSON.stringify(users))
        localStorage.setItem('cc_token', crypto.randomUUID())
        localStorage.setItem('cc_name', users[email].name)
        localStorage.setItem('cc_email', email)
        window.location.href = '/chat'
        return
      }

      // login
      const user = users[email]
      if (!user || user.password !== password) throw new Error('Invalid email or password')
      localStorage.setItem('cc_token', crypto.randomUUID())
      localStorage.setItem('cc_name', user.name)
      localStorage.setItem('cc_email', user.email)
      window.location.href = '/chat'
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur">
        <h1 className="text-3xl font-bold text-white text-center mb-2">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="text-blue-200/80 text-center mb-6">Sign {mode === 'login' ? 'in' : 'up'} to join the team chat</p>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm text-blue-200 mb-1">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ada Lovelace" />
            </div>
          )}
          <div>
            <label className="block text-sm text-blue-200 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
          </div>

          {error && <div className="text-red-400 text-sm bg-red-950/40 border border-red-500/30 p-2 rounded">{error}</div>}

          <button disabled={loading} className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold transition-colors">
            {loading ? 'Please wait...' : (mode === 'login' ? 'Sign in' : 'Create account')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-blue-300 hover:text-white text-sm">
            {mode === 'login' ? "Don't have an account? Sign up" : 'Have an account? Sign in'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-blue-200/70 hover:text-white text-sm">Back to home</a>
        </div>
      </div>
    </div>
  )
}
