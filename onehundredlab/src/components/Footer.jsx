import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F2] dark:bg-zinc-950 border-t border-stone-200 dark:border-zinc-800 px-8 py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo + Tagline */}
        <div className="text-center md:text-left">
          <p style={{fontFamily:'Cormorant Garamond, serif'}} className="text-zinc-900 dark:text-white font-black text-lg">
            OneHundredLabs
          </p>
          <p className="text-zinc-400 dark:text-zinc-500 text-xs tracking-widest uppercase mt-1">
            The right planner for you
          </p>
        </div>

        {/* Nav Links */}
        <div className="flex gap-6 text-sm text-zinc-400 dark:text-zinc-500">
          <Link to="/chat" className="hover:text-amber-700 dark:hover:text-yellow-400 transition-colors">AI Diet</Link>
          <Link to="/appointment" className="hover:text-amber-700 dark:hover:text-yellow-400 transition-colors">Appointments</Link>
          <Link to="/about" className="hover:text-amber-700 dark:hover:text-yellow-400 transition-colors">About</Link>
          <Link to="/pricing" className="hover:text-amber-700 dark:hover:text-yellow-400 transition-colors">Pricing</Link>
        </div>

        {/* Right — email + socials + copyright */}
        <div className="text-center md:text-right flex flex-col items-center md:items-end gap-2">
          <a 
            href="https://mail.google.com/mail/?view=cm&to=onehundredlabs@gmail.com" 
            target="_blank" 
            rel="noreferrer" 
            className="text-amber-700 dark:text-yellow-400 text-sm hover:underline">
            onehundredlabs@gmail.com
            </a>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-amber-700 dark:hover:text-yellow-400 transition-colors text-sm">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-amber-700 dark:hover:text-yellow-400 transition-colors text-sm">Twitter</a>
          </div>
          <p className="text-zinc-300 dark:text-zinc-600 text-xs">© 2026 OneHundredLabs</p>
        </div>

      </div>
    </footer>
  )
}