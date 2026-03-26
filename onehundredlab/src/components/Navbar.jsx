import { Link } from 'react-router-dom'

export default function Navbar({ dark, setDark }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-cream/90 dark:bg-zinc-950/90 backdrop-blur border-b border-stone-200 dark:border-yellow-600/20 px-8 py-4 flex items-center justify-between">
      <Link to="/" style={{fontFamily: 'Cormorant Garamond, serif'}} className="text-zinc-900 dark:text-yellow-400 font-black text-xl tracking-wide">
        OneHundredLabs
      </Link>
      <div className="flex items-center gap-8">
        <Link to="/chat" className="text-zinc-500 dark:text-white/60 hover:text-amber-700 dark:hover:text-yellow-400 text-sm transition-colors">AI Diet</Link>
        <Link to="/about" className="text-zinc-500 dark:text-white/60 hover:text-amber-700 dark:hover:text-yellow-400 text-sm transition-colors">About</Link>
        <Link to="/pricing" className="text-zinc-500 dark:text-white/60 hover:text-amber-700 dark:hover:text-yellow-400 text-sm transition-colors">Pricing</Link>
        <Link to="/appointment" className="text-zinc-500 dark:text-white/60 hover:text-amber-700 dark:hover:text-yellow-400 text-sm transition-colors">Appointments</Link>

        <button
          onClick={() => setDark(!dark)}
          className="text-lg hover:scale-110 transition-transform"
          title="Toggle theme"
        >
          {dark ? '☀️' : '🌙'}
        </button>

        <Link to="/login" className="bg-amber-700 dark:bg-yellow-400 text-white dark:text-black px-5 py-2 text-sm font-medium rounded-full hover:bg-amber-800 dark:hover:bg-yellow-300 transition-all">
          Login
        </Link>
      </div>
    </nav>
  )
}