import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        } else {
          el.style.opacity = '0'
          el.style.transform = 'translateY(40px)'
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function Home({ dark, setDark, user }) {
  const expertiseTitleRef = useReveal()
  const card1Ref = useReveal()
  const card2Ref = useReveal()
  const card3Ref = useReveal()

  const hiddenStyle = {
    opacity: 0,
    transform: 'translateY(40px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  }

  return (
    <div className="bg-[#FAF7F2] dark:bg-zinc-950 min-h-screen transition-colors duration-500">
      <Navbar dark={dark} setDark={setDark} user={user} />

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#f5e6c8_0%,_transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,_#2a1f0a_0%,_transparent_60%)] pointer-events-none" />

        <p className="text-amber-700 dark:text-yellow-500 text-xs tracking-[0.4em] uppercase mb-6 z-10">
          Precision Nutrition Science
        </p>

        <h1 style={{fontFamily:'Cormorant Garamond,serif'}} className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white leading-tight z-10 max-w-4xl">
          Fuel Your Body.<br />
          <span className="text-amber-700 dark:text-yellow-400">Own Your Performance.</span>
        </h1>

        <p className="mt-6 text-zinc-500 dark:text-white/50 text-lg max-w-xl z-10 leading-relaxed">
          Personalized diet plans powered by AI — or book a private consultation with our clinical nutritionists.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 z-10">
          <Link to={user ? '/chat' : '/login'} className="bg-amber-700 dark:bg-yellow-400 text-white dark:text-black px-8 py-4 font-medium text-sm tracking-widest uppercase rounded-full hover:bg-amber-800 dark:hover:bg-yellow-300 transition-all shadow-lg">
            Get My Diet Plan →
          </Link>
          <Link to="/appointment" className="border border-amber-700/40 dark:border-yellow-400/40 text-amber-700 dark:text-yellow-400 px-8 py-4 font-medium text-sm tracking-widest uppercase rounded-full hover:border-amber-700 dark:hover:border-yellow-400 transition-all">
            Book Consultation
          </Link>
        </div>

        <div className="mt-20 flex gap-12 z-10">
          {[['500+', 'Plans Generated'], ['100%', 'Personalized'], ['Private', 'Consultations']].map(([val, label]) => (
            <div key={label} className="text-center">
              <p style={{fontFamily:'Cormorant Garamond,serif'}} className="text-amber-700 dark:text-yellow-400 text-3xl font-black">{val}</p>
              <p className="text-zinc-400 dark:text-white/40 text-xs tracking-widest uppercase mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="min-h-screen flex flex-col items-center justify-center py-12 px-6">
        <div ref={expertiseTitleRef} style={hiddenStyle} className="text-center">
          <h2 style={{fontFamily:'Cormorant Garamond, serif'}} className="text-5xl font-black text-zinc-900 dark:text-white">Our Expertise</h2>
          <p className="text-zinc-500 dark:text-white/40 mt-4 max-w-md mx-auto">Tailored nutritional strategies designed for your unique physiology and goals.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
          {[
            { ref: card1Ref, delay: '0s', title: 'Individuals', desc: 'Optimize your daily wellness with evidence-based nutrition plans built around your lifestyle, taste preferences, and health markers.' },
            { ref: card2Ref, delay: '0.15s', title: 'Athletes', desc: 'Elevate performance through metabolic precision. We synchronize fueling with training cycles to maximize output and recovery.' },
            { ref: card3Ref, delay: '0.3s', title: 'Patients', desc: 'Support medical treatment through targeted clinical nutrition. We work alongside healthcare providers to manage specific conditions.' },
          ].map(({ ref, delay, title, desc }) => (
            <div key={title} ref={ref} style={{...hiddenStyle, transitionDelay: delay}}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-8 text-left border border-stone-100 dark:border-zinc-800 hover:shadow-xl transition-shadow duration-300">
              <span className="text-amber-700 dark:text-yellow-400 text-xl">→</span>
              <h3 style={{fontFamily:'Cormorant Garamond, serif'}} className="text-2xl font-bold text-zinc-900 dark:text-white mt-6 mb-3">{title}</h3>
              <p className="text-zinc-500 dark:text-white/50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}