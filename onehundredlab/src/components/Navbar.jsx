import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black border-b border-yellow-600/30 px-8 py-4 flex items-center justify-between">
      <Link to="/" className="text-yellow-400 font-bold text-xl tracking-widest uppercase">
        OneHundredLab
      </Link>
      <div className="flex items-center gap-8">
        <Link to="/chat" className="text-white/70 hover:text-yellow-400 text-sm tracking-wider transition-colors">AI Diet</Link>
        <Link to="/about" className="text-white/70 hover:text-yellow-400 text-sm tracking-wider transition-colors">About</Link>
        <Link to="/pricing" className="text-white/70 hover:text-yellow-400 text-sm tracking-wider transition-colors">Pricing</Link>
        <Link to="/appointment" className="text-white/70 hover:text-yellow-400 text-sm tracking-wider transition-colors">Appointments</Link>
        <Link to="/login" className="bg-yellow-400 text-black px-4 py-2 text-sm font-bold tracking-wider hover:bg-yellow-300 transition-colors">
          Login
        </Link>
      </div>
    </nav>
  )
}