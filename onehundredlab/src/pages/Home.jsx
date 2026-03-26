import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-black to-black pointer-events-none" />

        {/* Tag line */}
        <p className="text-yellow-400/60 text-xs tracking-[0.4em] uppercase mb-6 z-10">
          Precision Nutrition Science
        </p>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight z-10 max-w-4xl">
          Fuel Your Body.<br />
          <span className="text-yellow-400">Own Your Performance.</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-white/50 text-lg max-w-xl z-10">
          Personalized diet plans powered by AI — or book a private consultation with our clinical nutritionists.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 z-10">
          <Link to="/chat" className="bg-yellow-400 text-black px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-yellow-300 transition-all">
            Get My Diet Plan →
          </Link>
          <Link to="/appointment" className="border border-yellow-400/40 text-yellow-400 px-8 py-4 font-bold text-sm tracking-widest uppercase hover:border-yellow-400 transition-all">
            Book Consultation
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 flex gap-12 z-10">
          <div className="text-center">
            <p className="text-yellow-400 text-3xl font-black">500+</p>
            <p className="text-white/40 text-xs tracking-widest uppercase mt-1">Plans Generated</p>
          </div>
          <div className="text-center">
            <p className="text-yellow-400 text-3xl font-black">100%</p>
            <p className="text-white/40 text-xs tracking-widest uppercase mt-1">Personalized</p>
          </div>
          <div className="text-center">
            <p className="text-yellow-400 text-3xl font-black">Private</p>
            <p className="text-white/40 text-xs tracking-widest uppercase mt-1">Consultations</p>
          </div>
        </div>
      </section>
    </div>
  )
}