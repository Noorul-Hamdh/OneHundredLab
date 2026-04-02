import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Login({ dark, setDark }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setError('')
    setSuccess('')
    setLoading(true)

    if (!email || !password) {
      setError('Please fill in all fields.')
      setLoading(false)
      return
    }

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else navigate('/dashboard')
    } else {
      if (!username) { setError('Please enter a username.'); setLoading(false); return }
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { data: { username } }
      })
      if (error) setError(error.message)
      else setSuccess('Check your email to confirm your account!')
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/dashboard' }
    })
  }

  return (
    <div className="bg-[#FAF7F2] dark:bg-zinc-950 min-h-screen transition-colors duration-500">
      <Navbar dark={dark} setDark={setDark} />

      <div className="pt-32 pb-20 px-6 max-w-md mx-auto">
        <div className="text-center mb-10">
          <p className="text-amber-700 dark:text-yellow-500 text-xs tracking-[0.4em] uppercase mb-3">
            {mode === 'login' ? 'Welcome Back' : 'Get Started'}
          </p>
          <h1 style={{fontFamily:'Cormorant Garamond,serif'}} className="text-5xl font-black text-zinc-900 dark:text-white">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h1>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-stone-100 dark:border-zinc-800 space-y-4">

          <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 border border-stone-200 dark:border-zinc-700 rounded-xl py-3 text-sm text-zinc-700 dark:text-zinc-300 hover:border-amber-700 dark:hover:border-yellow-400 transition-all">
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-stone-200 dark:bg-zinc-700" />
            <span className="text-xs text-zinc-400">or</span>
            <div className="flex-1 h-px bg-stone-200 dark:bg-zinc-700" />
          </div>

          {/* Username — only on signup */}
          {mode === 'signup' && (
            <div>
              <label className="text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Username</label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="e.g. noorul"
                className="w-full mt-2 bg-[#FAF7F2] dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-amber-700 dark:focus:border-yellow-400 transition-colors"
                style={{userSelect:'text', cursor:'text'}}
              />
            </div>
          )}

          <div>
            <label className="text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              className="w-full mt-2 bg-[#FAF7F2] dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-amber-700 dark:focus:border-yellow-400 transition-colors"
              style={{userSelect:'text', cursor:'text'}}
            />
          </div>

          <div>
            <label className="text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              className="w-full mt-2 bg-[#FAF7F2] dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-amber-700 dark:focus:border-yellow-400 transition-colors"
              style={{userSelect:'text', cursor:'text'}}
            />
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}
          {success && <p className="text-green-600 text-xs">{success}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-amber-700 dark:bg-yellow-400 text-white dark:text-black py-4 rounded-full font-medium text-sm tracking-widest uppercase hover:bg-amber-800 dark:hover:bg-yellow-300 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-zinc-400 dark:text-zinc-500">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setSuccess('') }}
              className="text-amber-700 dark:text-yellow-400 hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}